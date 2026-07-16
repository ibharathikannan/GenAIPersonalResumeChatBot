import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  ViewChild
} from '@angular/core';
import * as THREE from 'three';

interface TechBadge {
  sprite: THREE.Sprite;
  basePosition: THREE.Vector3;
  floatSpeed: number;
  floatPhase: number;
}

/**
 * Decorative, mouse-reactive 3D backdrop (three.js) showing labeled badges
 * for the portfolio owner's actual tech stack (Angular, C#, .NET, NUS, AI,
 * ...) gently floating and orbiting behind the hero content, with faint
 * connecting lines between nearby badges. Runs its render loop outside
 * Angular's zone so it never triggers change detection.
 */
@Component({
  selector: 'eus-three-background',
  template: `<canvas #canvas class="three-canvas"></canvas>`,
  styleUrls: ['./three-background.component.scss']
})
export class ThreeBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) private readonly canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() labels: { text: string; color: string }[] = [
    { text: 'C#', color: '#9B4F96' },
    { text: 'Angular', color: '#DD0031' },
    { text: '.NET', color: '#512BD4' },
    { text: 'Azure', color: '#0078D4' },
    { text: 'NUS', color: '#003D7C' },
    { text: 'AI', color: '#16A34A' },
    { text: 'Python', color: '#4B8BBE' },
    { text: 'GenAI', color: '#A855F7' }
  ];

  /** Extra px the canvas extends beyond its host container on every side, so badges have room to orbit past the host's own bounds (e.g. around a smaller avatar wrapper). */
  @Input() spread = 0;

  @HostBinding('style.inset')
  get insetStyle(): string {
    return this.spread ? `-${this.spread}px` : '0';
  }

  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private lineSegments?: THREE.LineSegments;
  private frameId?: number;
  private resizeObserver?: ResizeObserver;

  private linkDistance = 11;
  private orbitRadius = 12;
  private badges: TechBadge[] = [];
  private linePositions!: Float32Array;

  private mouse = { x: 0, y: 0 };
  private rotation = { x: 0, y: 0 };
  private clock = new THREE.Clock();
  private destroyed = false;

  constructor(private readonly zone: NgZone, private readonly hostEl: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.init());
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
    this.resizeObserver?.disconnect();
    for (const badge of this.badges) {
      badge.sprite.geometry.dispose();
      const material = badge.sprite.material as THREE.SpriteMaterial;
      material.map?.dispose();
      material.dispose();
    }
    this.lineSegments?.geometry.dispose();
    (this.lineSegments?.material as THREE.Material)?.dispose();
    this.renderer?.dispose();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
  }

  private init(): void {
    if (!this.supportsWebGL()) {
      return;
    }

    const canvas = this.canvasRef.nativeElement;
    const host = this.hostEl.nativeElement;
    const width = host.clientWidth || window.innerWidth;
    const height = host.clientHeight || 320;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    this.camera.position.z = 24;

    // Derive the orbit radius from the camera's actual visible frustum at
    // the badges' depth, so — unlike a size-ratio guess — they're
    // guaranteed to spread across most of whatever canvas they're given,
    // instead of clustering in the middle and leaving the container's own
    // edges (or extra `spread` margin) empty. Sprite size and link distance
    // then scale off that same radius so everything stays proportionate.
    this.orbitRadius = this.computeFrustumHalfWidth() * 0.72;
    this.linkDistance = this.orbitRadius * 0.95;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    // updateStyle=false: leave the canvas's displayed box governed by our
    // own CSS (width/height: 100%) so it always visually fills its host
    // immediately via normal layout — setSize's width/height here only
    // drive the internal draw-buffer resolution and camera aspect. Letting
    // three.js write inline pixel styles instead froze the canvas at
    // whatever size the host happened to be at construction time (e.g. 0
    // height, before the avatar <img> had finished loading and given the
    // host its real size), and it never visually grew again afterward.
    this.renderer.setSize(width, height, false);

    this.buildBadges();
    this.buildLinks();

    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(host);

    this.animate();
  }

  private buildBadges(): void {
    if (!this.scene) {
      return;
    }

    const count = this.labels.length;
    for (let i = 0; i < count; i++) {
      const label = this.labels[i];
      const texture = this.createBadgeTexture(label.text, label.color);
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(material);

      const angle = (i / count) * Math.PI * 2;
      const radius = this.orbitRadius * (0.75 + Math.random() * 0.35);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.65 + (Math.random() - 0.5) * this.orbitRadius * 0.15;
      const z = Math.sin(angle) * radius * 0.4;

      const basePosition = new THREE.Vector3(x, y, z);
      sprite.position.copy(basePosition);

      const scale = this.orbitRadius * (label.text.length > 3 ? 0.42 : 0.32);
      sprite.scale.set(scale, scale * 0.5, 1);

      this.scene.add(sprite);
      this.badges.push({
        sprite,
        basePosition,
        floatSpeed: 0.5 + Math.random() * 0.4,
        floatPhase: Math.random() * Math.PI * 2
      });
    }
  }

  private buildLinks(): void {
    if (!this.scene) {
      return;
    }
    const maxPairs = (this.badges.length * (this.badges.length - 1)) / 2;
    this.linePositions = new Float32Array(maxPairs * 2 * 3);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(this.linePositions, 3));
    geometry.setDrawRange(0, 0);
    const material = new THREE.LineBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.18 });
    this.lineSegments = new THREE.LineSegments(geometry, material);
    this.scene.add(this.lineSegments);
  }

  /** Half-width (world units) of what the camera actually sees at the badges' depth. */
  private computeFrustumHalfWidth(): number {
    if (!this.camera) {
      return 12;
    }
    const vFovRad = (this.camera.fov * Math.PI) / 180;
    const dist = this.camera.position.z;
    const halfHeight = dist * Math.tan(vFovRad / 2);
    return halfHeight * this.camera.aspect;
  }

  private createBadgeTexture(text: string, color: string): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    const radius = 32;
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.arcTo(w, 0, w, h, radius);
    ctx.arcTo(w, h, 0, h, radius);
    ctx.arcTo(0, h, 0, 0, radius);
    ctx.arcTo(0, 0, w, 0, radius);
    ctx.closePath();
    ctx.fill();

    ctx.lineWidth = 6;
    ctx.strokeStyle = color;
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.font = 'bold 52px "Baloo 2", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, w / 2, h / 2 + 4);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  private onResize(): void {
    if (!this.renderer || !this.camera) {
      return;
    }
    const host = this.hostEl.nativeElement;
    const width = host.clientWidth || window.innerWidth;
    const height = host.clientHeight || 320;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    // updateStyle=false: leave the canvas's displayed box governed by our
    // own CSS (width/height: 100%) so it always visually fills its host
    // immediately via normal layout — setSize's width/height here only
    // drive the internal draw-buffer resolution and camera aspect. Letting
    // three.js write inline pixel styles instead froze the canvas at
    // whatever size the host happened to be at construction time (e.g. 0
    // height, before the avatar <img> had finished loading and given the
    // host its real size), and it never visually grew again afterward.
    this.renderer.setSize(width, height, false);
  }

  private animate = (): void => {
    if (this.destroyed) {
      return;
    }
    this.frameId = requestAnimationFrame(this.animate);
    this.tick();
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  };

  private tick(): void {
    if (!this.scene || !this.lineSegments) {
      return;
    }

    const elapsed = this.clock.getElapsedTime();
    for (const badge of this.badges) {
      badge.sprite.position.y =
        badge.basePosition.y + Math.sin(elapsed * badge.floatSpeed + badge.floatPhase) * this.orbitRadius * 0.07;
    }

    let vertexIndex = 0;
    for (let i = 0; i < this.badges.length; i++) {
      for (let j = i + 1; j < this.badges.length; j++) {
        const a = this.badges[i].sprite.position;
        const b = this.badges[j].sprite.position;
        const dist = a.distanceTo(b);
        if (dist < this.linkDistance) {
          const li = vertexIndex * 3;
          this.linePositions[li] = a.x;
          this.linePositions[li + 1] = a.y;
          this.linePositions[li + 2] = a.z;
          this.linePositions[li + 3] = b.x;
          this.linePositions[li + 4] = b.y;
          this.linePositions[li + 5] = b.z;
          vertexIndex += 2;
        }
      }
    }
    const lineAttr = this.lineSegments.geometry.attributes['position'] as THREE.BufferAttribute;
    lineAttr.needsUpdate = true;
    this.lineSegments.geometry.setDrawRange(0, vertexIndex);

    this.rotation.y += (this.mouse.x * 0.35 - this.rotation.y) * 0.035;
    this.rotation.x += (this.mouse.y * 0.15 - this.rotation.x) * 0.035;
    this.scene.rotation.y = this.rotation.y + elapsed * 0.03;
    this.scene.rotation.x = this.rotation.x;
  }

  private supportsWebGL(): boolean {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  }
}

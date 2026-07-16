import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';

/**
 * Adds a `.reveal-visible` class the first time the host element scrolls
 * into view, so CSS can animate it in. Falls back to revealing immediately
 * if IntersectionObserver isn't available.
 */
@Directive({
  selector: '[eusScrollReveal]'
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  @Input() eusRevealDelay = 0;

  private observer?: IntersectionObserver;

  constructor(private readonly el: ElementRef<HTMLElement>, private readonly renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'reveal-init');

    if (typeof IntersectionObserver === 'undefined') {
      this.reveal();
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.reveal();
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.15 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private reveal(): void {
    setTimeout(() => {
      this.renderer.addClass(this.el.nativeElement, 'reveal-visible');
    }, this.eusRevealDelay);
  }
}

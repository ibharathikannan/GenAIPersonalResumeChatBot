import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';
import { ChatService } from '../services/chat.service';
import { ChatUiService } from '../services/chat-ui.service';

const NUDGE_DELAY_MS = 2500;
const NUDGE_AUTO_HIDE_MS = 12000;
const INTERACTED_KEY = 'eus-chat-interacted';

@Component({
  selector: 'eus-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWidgetComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('messagesEl') private readonly messagesEl?: ElementRef<HTMLDivElement>;
  @ViewChildren('bubbleEl') private readonly bubbles?: QueryList<ElementRef<HTMLElement>>;

  private readonly destroyRef = inject(DestroyRef);

  isOpen = false;
  draft = '';

  private readonly justSentSubject = new BehaviorSubject<boolean>(false);
  readonly justSent$: Observable<boolean> = this.justSentSubject.asObservable();

  /** True until the visitor opens the chat once (this session) — drives the attention pulse/bounce. */
  hasInteracted = sessionStorage.getItem(INTERACTED_KEY) === 'true';

  /** One-time "hey, try me!" callout shown a couple seconds after load. */
  private readonly showNudgeSubject = new BehaviorSubject<boolean>(false);
  readonly showNudge$: Observable<boolean> = this.showNudgeSubject.asObservable();

  private scrollPending = false;
  private nudgeShowTimer?: ReturnType<typeof setTimeout>;
  private nudgeHideTimer?: ReturnType<typeof setTimeout>;

  readonly messages$: Observable<ChatMessage[]> = this.chatService.messages$;
  readonly isTyping$: Observable<boolean> = this.chatService.isTyping$;

  constructor(
    private readonly chatService: ChatService,
    private readonly chatUi: ChatUiService,
    private readonly cdr: ChangeDetectorRef
  ) {
    // Any new message or a typing-indicator change should pull the
    // conversation into view, but only while the panel is actually open.
    merge(this.messages$, this.isTyping$)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.isOpen) {
          this.scrollPending = true;
        }
      });

    // Lets other components (e.g. the hero's "Ask My AI Twin" CTA) open
    // this widget without holding a direct reference to it.
    this.chatUi.openRequests$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.openChat());
  }

  ngOnInit(): void {
    if (this.hasInteracted) {
      return;
    }
    this.nudgeShowTimer = setTimeout(() => {
      if (this.isOpen || this.hasInteracted) {
        return;
      }
      this.showNudgeSubject.next(true);
      this.nudgeHideTimer = setTimeout(() => {
        this.showNudgeSubject.next(false);
      }, NUDGE_AUTO_HIDE_MS);
    }, NUDGE_DELAY_MS);
  }

  ngOnDestroy(): void {
    clearTimeout(this.nudgeShowTimer);
    clearTimeout(this.nudgeHideTimer);
  }

  ngAfterViewChecked(): void {
    if (this.scrollPending && this.messagesEl) {
      this.scrollToLastBubbleTop();
      this.scrollPending = false;
    }
  }

  /**
   * Scrolls just far enough to bring the top of the newest bubble (the
   * latest reply, or the typing indicator while one's pending) into view —
   * not all the way to the bottom, so a long reply starts on-screen from
   * its first line instead of jumping straight to its end.
   *
   * Uses `offsetTop` (absolute position within the scroll container, which
   * has `position: relative` precisely so this is valid) rather than a
   * delta off the current scroll position — the open → typing → reply
   * sequence can fire this multiple times in quick succession while an
   * earlier smooth-scroll is still animating, and a relative calculation
   * reads a mid-flight `scrollTop`, compounding into the wrong target.
   */
  private scrollToLastBubbleTop(): void {
    const container = this.messagesEl?.nativeElement;
    const lastBubble = this.bubbles?.last?.nativeElement;
    if (!container) {
      return;
    }
    if (!lastBubble) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      return;
    }
    const target = lastBubble.offsetTop - 8;
    container.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
  }

  dismissNudge(event: Event): void {
    event.stopPropagation();
    this.showNudgeSubject.next(false);
  }

  toggleOpen(): void {
    if (this.isOpen) {
      this.isOpen = false;
      return;
    }
    this.openChat();
  }

  /** Opens the panel (no-op if already open) — used by toggleOpen() and by external CTAs via ChatUiService. */
  openChat(): void {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    this.scrollPending = true;
    this.showNudgeSubject.next(false);
    if (!this.hasInteracted) {
      this.hasInteracted = true;
      sessionStorage.setItem(INTERACTED_KEY, 'true');
    }
    this.cdr.markForCheck();
  }

  send(): void {
    if (!this.draft.trim()) {
      return;
    }
    this.chatService.sendMessage(this.draft);
    this.draft = '';

    // brief press/pulse animation on the send button
    this.justSentSubject.next(true);
    setTimeout(() => this.justSentSubject.next(false), 300);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  /**
   * Lightweight markdown-ish formatter for assistant replies: escapes any
   * HTML in the source text first (so nothing from the LLM output can inject
   * markup), then re-introduces a safe subset of formatting so **bold**,
   * *italic*, `- ` bullet lists, and paragraph breaks render legibly instead
   * of as raw asterisks/dashes.
   */
  formatMessage(text: string): string {
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const withBold = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    const withInline = withBold.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    const blocks = withInline.trim().split(/\n{2,}/);
    return blocks
      .map(block => {
        const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
        const isList = lines.length > 0 && lines.every(l => /^[-*]\s+/.test(l));
        if (isList) {
          const items = lines.map(l => `<li>${l.replace(/^[-*]\s+/, '')}</li>`).join('');
          return `<ul>${items}</ul>`;
        }
        return `<p>${lines.join('<br>')}</p>`;
      })
      .join('');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { environment as env } from '@env/environment';
import { ChatMessage } from '../models/chat-message.model';

const SESSION_STORAGE_KEY = 'eus-chat-history';
const FALLBACK_REPLY = "I'm still getting wired up to my AI backend — check back soon!";

interface ChatResponse {
  reply: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly messagesSubject = new BehaviorSubject<ChatMessage[]>(this.readSession());
  readonly messages$: Observable<ChatMessage[]> = this.messagesSubject.asObservable();

  private readonly typingSubject = new BehaviorSubject<boolean>(false);
  readonly isTyping$: Observable<boolean> = this.typingSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  get messages(): ChatMessage[] {
    return this.messagesSubject.value;
  }

  sendMessage(text: string): void {
    const trimmed = text.trim();
    if (!trimmed || this.typingSubject.value) {
      return;
    }

    this.appendMessage({ role: 'user', text: trimmed, timestamp: new Date().toISOString() });
    this.typingSubject.next(true);

    this.http
      .post<ChatResponse>(`${env.chatApiUrl}/chat`, {
        message: trimmed,
        history: this.messages
      })
      .pipe(
        tap(response =>
          this.appendMessage({
            role: 'assistant',
            text: (response.reply || '').trim(),
            timestamp: new Date().toISOString()
          })
        ),
        catchError(() => {
          this.appendMessage({
            role: 'assistant',
            text: FALLBACK_REPLY,
            timestamp: new Date().toISOString()
          });
          return [];
        }),
        finalize(() => this.typingSubject.next(false))
      )
      .subscribe();
  }

  clearHistory(): void {
    this.messagesSubject.next([]);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }

  private appendMessage(message: ChatMessage): void {
    const next = [...this.messages, message];
    this.messagesSubject.next(next);
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(next));
  }

  private readSession(): ChatMessage[] {
    try {
      const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}

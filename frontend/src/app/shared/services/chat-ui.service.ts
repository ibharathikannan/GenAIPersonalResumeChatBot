import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Lets any component (e.g. a hero CTA) ask the floating chat widget to open,
 * without them needing a direct reference to each other.
 */
@Injectable({
  providedIn: 'root'
})
export class ChatUiService {
  private readonly openSubject = new Subject<void>();
  readonly openRequests$ = this.openSubject.asObservable();

  requestOpen(): void {
    this.openSubject.next();
  }
}

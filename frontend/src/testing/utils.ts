import { NgModule, Injectable, InjectionToken } from '@angular/core';
import { SharedModule } from '@app/shared';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  Store,
  StateObservable,
  ActionsSubject,
  ReducerManager,
  StoreModule
} from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FormlyModule } from '@ngx-formly/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/core/notifications/notification.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { validationMessage } from '@app/core/validators/validation-message';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Injectable()
export class MockStore<T> extends Store<T> {
  private stateSubject = new BehaviorSubject<T>({} as T);

  constructor(
    state$: StateObservable,
    actionsObserver: ActionsSubject,
    reducerManager: ReducerManager
  ) {
    super(state$, actionsObserver, reducerManager);
    this.source = this.stateSubject.asObservable();
  }

  setState(nextState: T) {
    this.stateSubject.next(nextState);
  }
}

export function provideMockStore() {
  return {
    provide: Store,
    useClass: MockStore
  };
}

const mockDialogRef = {
  // close: jasmine.createSpy('close')
};

@NgModule({ exports: [
        NoopAnimationsModule,
        RouterTestingModule,
        SharedModule,
        TranslateModule
    ], imports: [NoopAnimationsModule,
        RouterTestingModule,
        SharedModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot({}, { runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true } }),
        FormlyModule.forRoot({
            validationMessages: validationMessage
        }),
        FormlyMaterialModule], providers: [
        provideMockStore(),
        NotificationService,
        {
            provide: MatDialogRef,
            useValue: mockDialogRef
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        ReactiveFormsModule,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ] })
export class TestingModule {
  constructor() {}
}

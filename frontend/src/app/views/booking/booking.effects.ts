import { Injectable } from '@angular/core';
import { AppState, NotificationService } from '@app/core';
import { BookingService } from '@app/shared/services/booking.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ActionCancelBooking, ActionCancelBookingFailed, ActionCancelBookingSuccess, ActionRetrieveBooking, ActionRetrieveBookingFailed, ActionRetrieveBookingSuccess, BookingActionTypes } from './booking.actions';

@Injectable()
export class BookingEffects {

  constructor(private actions$: Actions
    , private bookingService: BookingService
    , private notification: NotificationService
    , private translate: TranslateService
    , private store: Store<AppState>,) {}

    retrieve = createEffect(() => this.actions$.pipe(
      ofType<ActionRetrieveBooking>(BookingActionTypes.RETRIEVE_BOOKING),
      switchMap((action: ActionRetrieveBooking) =>

        this.bookingService.getBooking(action.payload.bookingRef).pipe(
          map(response => {
            return new ActionRetrieveBookingSuccess({ bookingModel: response });
          }),
          catchError(error => of(new ActionRetrieveBookingFailed({ error: error })))
        )
      )
    ));

    cancel = createEffect(() => this.actions$.pipe(
      ofType<ActionCancelBooking>(BookingActionTypes.CANCEL_BOOKING),
      switchMap((action: ActionCancelBooking) =>

        this.bookingService.cancelBooking(action.payload.booking).pipe(
          map(response => {
            return new ActionCancelBookingSuccess({ response: response });
          }),
          catchError(error => of(new ActionCancelBookingFailed({ error: error })))
        )
      )
    ));

}

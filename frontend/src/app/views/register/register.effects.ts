import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionCheckIsEmailValid, ActionCheckIsEmailValidFailed, ActionCheckIsEmailValidSuccess, ActionGetAllStore, ActionGetAllStoreFailed, ActionGetAllStoreSuccess, ActionGetProductList, ActionGetProductListFailed, ActionGetProductListSuccess, ActionGetStockAlert, ActionGetStockAlertFailed, ActionGetStockAlertSuccess, ActionGetStoreList, ActionGetStoreListFailed, ActionGetStoreListSuccess, ActionGetTimeSlotByStore, ActionGetTimeSlotByStoreFailed, ActionGetTimeSlotByStoreSuccess, ActionSubmitBooking, ActionSubmitBookingFailed, ActionSubmitBookingSuccess, ActionSubmitStockAlert, ActionSubmitStockAlertFailed, ActionSubmitStockAlertSuccess, RegisterActionTypes } from './register.actions';
import { switchMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RegisterService } from '@app/shared/services/register.service';
import { NotificationService, AppState } from '@app/core';
import { TranslateService } from '@ngx-translate/core';
import { Store, select, Action } from '@ngrx/store';
import { selectErrorMessage } from './register.selectors';
import { BookingService } from '@app/shared/services/booking.service';
import { ActionRetrieveBookingFailed, ActionRetrieveBookingSuccess } from '../booking/booking.actions';

@Injectable()
export class RegisterEffects {

  constructor(private actions$: Actions
    , private registerService: RegisterService
    , private bookingService: BookingService
    , private notification: NotificationService
    , private translate: TranslateService
    , private store: Store<AppState>,) {}

  checkIsEmailValid$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<ActionCheckIsEmailValid>(RegisterActionTypes.CHECK_IS_EMAIL_VALID),
    switchMap((action: ActionCheckIsEmailValid) =>
      this.registerService.isEmailValid(action.payload.email).pipe(
        map(response => {
          return new ActionCheckIsEmailValidSuccess({ response: true });
        }),
        catchError(error => of(new ActionCheckIsEmailValidFailed({ response: 'invalid email address' })))
      )
    )
  ));

  getProductList$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<ActionGetProductList>(RegisterActionTypes.GET_PRODUCT_LIST),
    switchMap((action: ActionGetProductList) =>
      this.registerService.getProductList().pipe(
        map(response => {
          return new ActionGetProductListSuccess({ response: response });
        }),
        catchError(error => of(new ActionGetProductListFailed({ response: error })))
      )
    )
  ));

  getStoreList$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<ActionGetStoreList>(RegisterActionTypes.GET_STORE_LIST),
    switchMap((action: ActionGetStoreList) =>
      this.registerService.getStoreList(action.payload.productId).pipe(
        map(response => {
          return new ActionGetStoreListSuccess({ response: response });
        }),
        catchError(error => of(new ActionGetStoreListFailed({ response: error })))
      )
    )
  ));

  getAllStore$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<ActionGetAllStore>(RegisterActionTypes.GET_ALL_STORE),
    switchMap((action: ActionGetAllStore) =>
      this.registerService.getAllStore().pipe(
        map(response => {
          return new ActionGetAllStoreSuccess({ response: response });
        }),
        catchError(error => of(new ActionGetAllStoreFailed({ response: error })))
      )
    )
  ));

  submitBooking = createEffect(() => this.actions$.pipe(
    ofType<ActionSubmitBooking>(RegisterActionTypes.SUBMIT_BOOKING),
    switchMap((action: ActionSubmitBooking) =>
      this.registerService.submitBooking(action.payload.registerModel).pipe(
        map(response => {
          return new ActionSubmitBookingSuccess({ response: response });
        }),
        catchError(error => of(new ActionSubmitBookingFailed({ response: error })))
      )
    )
  ));

  submitBookingSuccess = createEffect(() => this.actions$.pipe(
    ofType<ActionSubmitBookingSuccess>(RegisterActionTypes.SUBMIT_BOOKING_SUCCESS),
    switchMap((action: ActionSubmitBookingSuccess) =>
      this.bookingService.getBooking(action.payload.response.bookingRef).pipe(
        map(response => {
          return new ActionRetrieveBookingSuccess({ bookingModel: response });
        }),
        catchError(error => of(new ActionRetrieveBookingFailed({ error: error })))
      )
    )
  ));

  /*
  @Effect({ dispatch: false })
  submitFailed = this.actions$.pipe(
    ofType(
      RegisterActionTypes.SUBMIT_FAILED,
    ),
    withLatestFrom(this.store.pipe(select(selectErrorMessage))),
    tap(([action, errMsg]) => this.notification.error(errMsg.error))
  );
  */

  submitStockAlert = createEffect(() => this.actions$.pipe(
    ofType<ActionSubmitStockAlert>(RegisterActionTypes.SUBMIT_STOCKALERT),
    switchMap((action: ActionSubmitStockAlert) =>
      this.registerService.submitStockAlert(action.payload.submissionModel).pipe(
        map(response => {
          return new ActionSubmitStockAlertSuccess({ response: response });
        }),
        catchError(error => of(new ActionSubmitStockAlertFailed({ response: error })))
      )
    )
  ));

  getStockAlert$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<ActionGetStockAlert>(RegisterActionTypes.GET_STOCKALERT),
    switchMap((action: ActionGetStockAlert) =>
      this.registerService.getStockAlert(action.payload.refNumber).pipe(
        map(response => {
          return new ActionGetStockAlertSuccess({ response: response });
        }),
        catchError(error => of(new ActionGetStockAlertFailed({ response: error })))
      )
    )
  ));

  getTimeSlotByStore = createEffect(() => this.actions$.pipe(
    ofType<ActionGetTimeSlotByStore>(RegisterActionTypes.GET_TIMESLOT_BY_STORE),
    switchMap((action: ActionGetTimeSlotByStore) =>
      this.registerService.getTimeSlotByStore(action.payload.response).pipe(
        map(response => {
          return new ActionGetTimeSlotByStoreSuccess({ response: response });
        }),
        catchError(error => of(new ActionGetTimeSlotByStoreFailed({ response: error })))
      )
    )
  ));

}
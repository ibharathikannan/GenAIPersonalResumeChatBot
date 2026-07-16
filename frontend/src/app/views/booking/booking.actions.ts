import { BookingModel } from '@app/shared/models/booking.model';
import { Action, createAction, props } from '@ngrx/store';

export enum BookingActionTypes {
  RETRIEVE_BOOKING = '[Booking] Retrieve booking',
  RETRIEVE_BOOKING_SUCCESS = '[Booking] Retrieve booking success',
  RETRIEVE_BOOKING_FAILED = '[Booking] Retrieve booking failed',
  CANCEL_BOOKING = '[Booking] Cancel booking',
  CANCEL_BOOKING_SUCCESS = '[Booking] Cancel booking success',
  CANCEL_BOOKING_FAILED = '[Booking] Cancel booking failed'
}

export class ActionRetrieveBooking implements Action {
  readonly type = BookingActionTypes.RETRIEVE_BOOKING;
  constructor(readonly payload: { bookingRef: string }) { }
}

export class ActionRetrieveBookingSuccess implements Action {
  readonly type = BookingActionTypes.RETRIEVE_BOOKING_SUCCESS;
  constructor(readonly payload: { bookingModel: any }) { }
}

export class ActionRetrieveBookingFailed implements Action {
  readonly type = BookingActionTypes.RETRIEVE_BOOKING_FAILED;
  constructor(readonly payload: { error: any }) { }
}

export class ActionCancelBooking implements Action {
  readonly type = BookingActionTypes.CANCEL_BOOKING;
  constructor(readonly payload: { booking: BookingModel }) { }
}

export class ActionCancelBookingSuccess implements Action {
  readonly type = BookingActionTypes.CANCEL_BOOKING_SUCCESS;
  constructor(readonly payload: { response: any }) { }
}

export class ActionCancelBookingFailed implements Action {
  readonly type = BookingActionTypes.CANCEL_BOOKING_FAILED;
  constructor(readonly payload: { error: any }) { }
}

export type BookingActions = 
| ActionRetrieveBooking
| ActionRetrieveBookingSuccess
| ActionRetrieveBookingFailed
| ActionCancelBooking
| ActionCancelBookingSuccess
| ActionCancelBookingFailed;
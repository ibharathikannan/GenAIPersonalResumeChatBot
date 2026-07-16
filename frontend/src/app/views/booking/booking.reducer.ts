import { BookingModel } from '@app/shared/models/booking.model';
import { StockAlertModel } from '@app/shared/models/stock-alert.model';
import { Action, createReducer, on } from '@ngrx/store';
import { BookingActionTypes, BookingActions } from './booking.actions';

export interface BookingState {
  enteredBookingRef?: string;
  booking?: BookingModel;
  isLoading: boolean;
  errorMessage?: any
}

export const initialState: BookingState = {
  isLoading: false
};


export function bookingReducer(
  state = initialState, 
  action: BookingActions)
: BookingState {
  switch (action.type) {
    case BookingActionTypes.RETRIEVE_BOOKING:
      return {
        ...state,
        isLoading: true,
        enteredBookingRef: action.payload.bookingRef 
      }
    case BookingActionTypes.RETRIEVE_BOOKING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        booking: action.payload.bookingModel 
      }
    case BookingActionTypes.RETRIEVE_BOOKING_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.error
      }
    case BookingActionTypes.CANCEL_BOOKING:
      return {
        ...state,
        isLoading: true,
      }
    case BookingActionTypes.CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        booking: {
          ...state.booking,
          status: 2
        }
      }
    case BookingActionTypes.CANCEL_BOOKING_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.error
      }

    default:
      return state;
  }

}


function BookingActions(arg0: BookingState, action: any, BookingActions: any) {
  throw new Error('Function not implemented.');
}


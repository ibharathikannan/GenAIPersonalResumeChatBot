import { AppState } from '@app/core';
import { createSelector } from '@ngrx/store';
import { BookingState } from './booking.reducer';

export const selectBookingState = (state: AppState) => state.booking;

export const selectBooking = createSelector(
    selectBookingState,
    (state: BookingState) => state.booking
);

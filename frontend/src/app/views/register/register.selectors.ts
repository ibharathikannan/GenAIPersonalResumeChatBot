import { AppState } from '@app/core';
import { TimeSlotModel } from '@app/shared/models/time-slot.model';
import { createSelector } from '@ngrx/store';
import { RegisterState } from './register.reducer';

export const selectRegisterState = (state: AppState) => state.register;

export const selectErrorMessage = createSelector(
    selectRegisterState,
    (state: RegisterState) => state.errorMessage.errors[0].message
);

export const selectIsEmailValid = createSelector(
    selectRegisterState,
    (state: RegisterState) => state.isEmailValid
);

export const getProductList = createSelector(
    selectRegisterState,
    (state: RegisterState) => state.productList
);

export const getStoreList = createSelector(
    selectRegisterState,
    (state: RegisterState) => state.storeList
);

export const getAllStoreList = createSelector(
    selectRegisterState,
    (state: RegisterState) => state.allstoreList
);


export const getFormInfo = createSelector(
    selectRegisterState,
    (state: RegisterState) => state.formInfo
);

export const selectIsSubmitFailed = createSelector(
    selectRegisterState,
    (state: RegisterState) => state.isSubmitFailed
);

export const selectStockAlert = createSelector(
    selectRegisterState,
    (state: RegisterState) => state.stockAlert
);

export const selectIsStockAlertSent = createSelector(
    selectRegisterState,
    (state: RegisterState) => state.isStockAlertSent
);

export const selectTimeSlots = createSelector(
    selectRegisterState,
    (state: RegisterState) => state.timeslots
    //.sort((a,b) => a.startDateTime() - b.startDateTime.getHours())
);

export const selectSelectedDate = createSelector(
    selectRegisterState,
    (state: RegisterState) => state.selectedDate
);


export const selectFilteredTimeSlots = createSelector(
    selectTimeSlots,
    selectSelectedDate,
    (timeslots: TimeSlotModel[], selectedDate: Date) => {
      if (timeslots && selectedDate) {
        return timeslots.filter((timeslot: TimeSlotModel) =>
        new Date(timeslot.startDateTime).getDate() === selectedDate.getDate()
        && new Date(timeslot.startDateTime).getMonth() === selectedDate.getMonth());
      } else {
        return timeslots;
      }
    }
    //.filter(x => x.startDateTime.getDate == state.selectedDate.getDate)
  );

export const selectFilteredHasTimeSlots = createSelector(
  selectTimeSlots,
  selectSelectedDate,
  (timeslots: TimeSlotModel[], selectedDate: Date) => {
    if (timeslots && selectedDate) {
      return timeslots.filter((timeslot: TimeSlotModel) =>
      new Date(timeslot.startDateTime).getDate() === selectedDate.getDate()
      && new Date(timeslot.startDateTime).getMonth() === selectedDate.getMonth()
      && timeslot.reservedCount===0)

    } else {
      return timeslots;
    }
  }
  //.filter(x => x.startDateTime.getDate == state.selectedDate.getDate)
);

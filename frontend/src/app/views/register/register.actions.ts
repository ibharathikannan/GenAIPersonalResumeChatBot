import { ProductListModel } from '@app/shared/models/product.model';
import { RegisterModel } from '@app/shared/models/register.model';
import { StockAlertModel, StockAlertSubmissionRequest } from '@app/shared/models/stock-alert.model';
import { StoreListModel } from '@app/shared/models/store.model';
import { RetrieveTimeSlotModel, TimeSlotModel } from '@app/shared/models/time-slot.model';
import { Action } from '@ngrx/store';

export enum RegisterActionTypes {
  LOAD_REGISTER = '[Register] Load Registers',
  CHECK_IS_EMAIL_VALID = '[Register] Is Email Valid',
  CHECK_IS_EMAIL_VALID_SUCCESS = '[Register] Check Is Email Valid Success',
  CHECK_IS_EMAIL_VALID_FAILED = '[Register] Check Is Email Valid Failed',
  GET_PRODUCT_LIST = '[Register] Get a list of products',
  GET_PRODUCT_LIST_SUCCESS = '[Register] Get a list of products success',
  GET_PRODUCT_LIST_FAILED = '[Register] Get a list of products failed',
  GET_STORE_LIST = '[Register] Get a list of stores',
  GET_STORE_LIST_SUCCESS = '[Register] Get a list of stores success',
  GET_STORE_LIST_FAILED = '[Register] Get a list of stores failed',
  GET_ALL_STORE = '[Register] Get all stores',
  GET_ALL_STORE_SUCCESS = '[Register] Get all stores success',
  GET_ALL_STORE_FAILED = '[Register] Get all stores failed',
  SAVE_SELECTED_DATE = '[Register] Save selected date',
  GET_TIMESLOT_BY_STORE = '[Register] Get time slot by stores',
  GET_TIMESLOT_BY_STORE_SUCCESS = '[Register] Get time slot by stores success',
  GET_TIMESLOT_BY_STORE_FAILED = '[Register] Get time slot by stores failed',
  SAVE_FORM_INFO = '[Register] Save registration form information',
  SUBMIT_BOOKING = '[Register] Submit Booking',
  SUBMIT_BOOKING_SUCCESS = '[Register] Submit booking success',
  SUBMIT_BOOKING_FAILED = '[Register] Submit booking failed',  
  SUBMIT_STOCKALERT = '[Register] Submit Stock Alert',
  SUBMIT_STOCKALERT_SUCCESS = '[Register] Submit Stock Alert Success',
  SUBMIT_STOCKALERT_FAILED = '[Register] Submit Stock Alert Failed',  
  GET_STOCKALERT = '[Register] Get Stock Alert',
  GET_STOCKALERT_SUCCESS = '[Register] Get Stock Alert Success',
  GET_STOCKALERT_FAILED = '[Register] Get Stock Alert Failed',  
}

export class ActionLoadRegisters implements Action {
  readonly type = RegisterActionTypes.LOAD_REGISTER;
  constructor(readonly payload: { email: string, emailhs: string, countryCode: string }) { }
}

export class ActionCheckIsEmailValid implements Action {
  readonly type = RegisterActionTypes.CHECK_IS_EMAIL_VALID;
  constructor(readonly payload: { email: string }) { }
}

export class ActionCheckIsEmailValidSuccess implements Action {
  readonly type = RegisterActionTypes.CHECK_IS_EMAIL_VALID_SUCCESS;
  constructor(readonly payload: { response: any }) { }
}

export class ActionCheckIsEmailValidFailed implements Action {
  readonly type = RegisterActionTypes.CHECK_IS_EMAIL_VALID_FAILED;
  constructor(readonly payload: { response: any }) { }
}

export class ActionGetProductList implements Action {
  readonly type = RegisterActionTypes.GET_PRODUCT_LIST;
}

export class ActionGetProductListSuccess implements Action {
  readonly type = RegisterActionTypes.GET_PRODUCT_LIST_SUCCESS;
  constructor(readonly payload: { response: ProductListModel[] }) { }
}

export class ActionGetProductListFailed implements Action {
  readonly type = RegisterActionTypes.GET_PRODUCT_LIST_FAILED;
  constructor(readonly payload: { response: any }) { }
}

export class ActionGetStoreList implements Action {
  readonly type = RegisterActionTypes.GET_STORE_LIST;
  constructor(readonly payload: { productId: number }) { }
}

export class ActionGetStoreListSuccess implements Action {
  readonly type = RegisterActionTypes.GET_STORE_LIST_SUCCESS;
  constructor(readonly payload: { response: StoreListModel[] }) { }
}

export class ActionGetStoreListFailed implements Action {
  readonly type = RegisterActionTypes.GET_STORE_LIST_FAILED;
  constructor(readonly payload: { response: any }) { }
}

export class ActionGetAllStore implements Action {
  readonly type = RegisterActionTypes.GET_ALL_STORE;
}

export class ActionGetAllStoreSuccess implements Action {
  readonly type = RegisterActionTypes.GET_ALL_STORE_SUCCESS;
  constructor(readonly payload: { response: StoreListModel[] }) { }
}

export class ActionGetAllStoreFailed implements Action {
  readonly type = RegisterActionTypes.GET_ALL_STORE_FAILED;
  constructor(readonly payload: { response: any }) { }
}

export class ActionSaveSelectedDate implements Action {
  readonly type = RegisterActionTypes.SAVE_SELECTED_DATE;
  constructor(readonly payload: { selectedDate: Date  }) { }
}

export class ActionGetTimeSlotByStore implements Action {
  readonly type = RegisterActionTypes.GET_TIMESLOT_BY_STORE;
  constructor(readonly payload: { response: RetrieveTimeSlotModel }) { }
}

export class ActionGetTimeSlotByStoreSuccess implements Action {
  readonly type = RegisterActionTypes.GET_TIMESLOT_BY_STORE_SUCCESS;
  constructor(readonly payload: { response: TimeSlotModel[] }) { }
}

export class ActionGetTimeSlotByStoreFailed implements Action {
  readonly type = RegisterActionTypes.GET_TIMESLOT_BY_STORE_FAILED;
  constructor(readonly payload: { response: any }) { }
}

export class ActionSaveFormInfo implements Action {
  readonly type = RegisterActionTypes.SAVE_FORM_INFO;
  constructor(readonly payload: { registerModel: RegisterModel }) { }
}

export class ActionSubmitBooking implements Action {
  readonly type = RegisterActionTypes.SUBMIT_BOOKING;
  constructor(readonly payload: { registerModel: RegisterModel }) { }
}

export class ActionSubmitBookingSuccess implements Action {
  readonly type = RegisterActionTypes.SUBMIT_BOOKING_SUCCESS;
  constructor(readonly payload: { response: any }) { }
}

export class ActionSubmitBookingFailed implements Action {
  readonly type = RegisterActionTypes.SUBMIT_BOOKING_FAILED;
  constructor(readonly payload: { response: any }) { }
}

export class ActionSubmitStockAlert implements Action {
  readonly type = RegisterActionTypes.SUBMIT_STOCKALERT;
  constructor(readonly payload: { submissionModel: StockAlertSubmissionRequest }) { }
}

export class ActionSubmitStockAlertSuccess implements Action {
  readonly type = RegisterActionTypes.SUBMIT_STOCKALERT_SUCCESS;
  constructor(readonly payload: { response: any }) { }
}

export class ActionSubmitStockAlertFailed implements Action {
  readonly type = RegisterActionTypes.SUBMIT_STOCKALERT_FAILED;
  constructor(readonly payload: { response: any }) { }
}

export class ActionGetStockAlert implements Action {
  readonly type = RegisterActionTypes.GET_STOCKALERT;
  constructor(readonly payload: { refNumber: string }) { }
}

export class ActionGetStockAlertSuccess implements Action {
  readonly type = RegisterActionTypes.GET_STOCKALERT_SUCCESS;
  constructor(readonly payload: { response: any }) { }
}

export class ActionGetStockAlertFailed implements Action {
  readonly type = RegisterActionTypes.GET_STOCKALERT_FAILED;
  constructor(readonly payload: { response: any }) { }
}

export type RegisterActions = 
| ActionLoadRegisters
| ActionCheckIsEmailValid
| ActionCheckIsEmailValidSuccess
| ActionCheckIsEmailValidFailed
| ActionGetProductList
| ActionGetProductListSuccess
| ActionGetProductListFailed
| ActionGetStoreList
| ActionGetStoreListSuccess
| ActionGetStoreListFailed
| ActionGetAllStore
| ActionGetAllStoreSuccess
| ActionGetAllStoreFailed
| ActionSaveSelectedDate
| ActionGetTimeSlotByStore
| ActionGetTimeSlotByStoreSuccess
| ActionGetTimeSlotByStoreFailed
| ActionSaveFormInfo
| ActionSubmitBooking
| ActionSubmitBookingSuccess
| ActionSubmitBookingFailed
| ActionSubmitStockAlert
| ActionSubmitStockAlertSuccess
| ActionSubmitStockAlertFailed
| ActionGetStockAlert
| ActionGetStockAlertSuccess
| ActionGetStockAlertFailed;
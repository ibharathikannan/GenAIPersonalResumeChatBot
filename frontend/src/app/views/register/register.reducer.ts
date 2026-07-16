import { ProductListModel } from '@app/shared/models/product.model';
import { ErrorModel, RegisterModel } from '@app/shared/models/register.model';
import { StockAlertModel } from '@app/shared/models/stock-alert.model';
import { StoreListModel } from '@app/shared/models/store.model';
import { TimeSlotModel } from '@app/shared/models/time-slot.model';
import { faTheRedYeti } from '@fortawesome/free-brands-svg-icons';
import { RegisterActionTypes, RegisterActions } from './register.actions';

export interface RegisterState {
  productList?: ProductListModel[];
  storeList?: StoreListModel[];
  allstoreList?: StoreListModel[];
  selectedDate?: Date;
  timeslots?: TimeSlotModel[];
  formInfo?: RegisterModel;
  isEmailValid?: boolean;
  isLoading: boolean;
  isSubmitFailed: boolean;
  stockAlert?: StockAlertModel;
  isStockAlertSent: boolean;
  errorMessage?: ErrorModel;
}

export const initialState: RegisterState = {
  isLoading: false,
  productList: [],
  storeList: [],
  allstoreList: [],
  timeslots: [],
  isSubmitFailed: false,
  isStockAlertSent: false
};

export function registerReducer(
  state = initialState, 
  action: RegisterActions)
: RegisterState {
  switch (action.type) {
    case RegisterActionTypes.LOAD_REGISTER:
      return {
        ...state,
      }
      
    case RegisterActionTypes.CHECK_IS_EMAIL_VALID:
      return {
        ...state,
        isLoading: true,
        errorMessage: undefined
      };
    case RegisterActionTypes.CHECK_IS_EMAIL_VALID_SUCCESS:
      return {
        ...state,
        isEmailValid: true,
        isLoading: false
      }
    case RegisterActionTypes.CHECK_IS_EMAIL_VALID_FAILED:
      return {
        ...state,
        isLoading: false,
        isEmailValid: false,
        errorMessage: action.payload.response
      }
    case RegisterActionTypes.GET_PRODUCT_LIST:
      return {
        ...state,
        isLoading: true,
        errorMessage: undefined
      };
    case RegisterActionTypes.GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: action.payload.response,
        isLoading: false
      }
    case RegisterActionTypes.GET_PRODUCT_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.response
      }
    case RegisterActionTypes.GET_STORE_LIST:
      return {
        ...state,
        isLoading: true,
        errorMessage: undefined
      };
    case RegisterActionTypes.GET_STORE_LIST_SUCCESS:
      return {
        ...state,
        storeList: action.payload.response,
        isLoading: false
      }
    case RegisterActionTypes.GET_STORE_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.response
      }

    case RegisterActionTypes.GET_ALL_STORE:
      return {
        ...state,
        isLoading: true,
        errorMessage: undefined
      };
    case RegisterActionTypes.GET_ALL_STORE_SUCCESS:
      return {
        ...state,
        allstoreList: action.payload.response,
        isLoading: false
      }
    case RegisterActionTypes.GET_ALL_STORE_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.response
      }

    case RegisterActionTypes.SAVE_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload.selectedDate
      };

    case RegisterActionTypes.GET_TIMESLOT_BY_STORE:
      return {
        ...state,
        isLoading: true,
        errorMessage: undefined
      };
    case RegisterActionTypes.GET_TIMESLOT_BY_STORE_SUCCESS:
      return {
        ...state,
        timeslots: action.payload.response,
        isLoading: false
      }
    case RegisterActionTypes.GET_TIMESLOT_BY_STORE_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.response
      }

    case RegisterActionTypes.SAVE_FORM_INFO:
      return {
        ...state,
        formInfo: action.payload.registerModel
      }

    case RegisterActionTypes.SUBMIT_BOOKING:
      return {
        ...state,
        isLoading: true,
        errorMessage: undefined,
        isSubmitFailed: false
      }
    case RegisterActionTypes.SUBMIT_BOOKING_SUCCESS:
      return {
        ...state,
        formInfo: undefined,
        isLoading: false
      }

    case RegisterActionTypes.SUBMIT_BOOKING_FAILED:
      return {
        ...state,
        isLoading: false,
        isSubmitFailed: true,
        errorMessage: action.payload.response.error
      }
      
    case RegisterActionTypes.SUBMIT_STOCKALERT:
      return {
        ...state,
        isLoading: true,
        errorMessage: undefined,
        isSubmitFailed: false
      }

    case RegisterActionTypes.SUBMIT_STOCKALERT_SUCCESS:
      return {
        ...state,
        formInfo: undefined,
        stockAlert: action.payload.response.stockAlert,
        isStockAlertSent: true,
        isLoading: false
      }

    case RegisterActionTypes.SUBMIT_STOCKALERT_FAILED:
      return {
        ...state,
        isLoading: false,
        isSubmitFailed: true,
        errorMessage: action.payload.response.error
      }

    case RegisterActionTypes.GET_STOCKALERT:
      return {
        ...state,
        isLoading: true,
        errorMessage: undefined
      }

    case RegisterActionTypes.GET_STOCKALERT_SUCCESS:
      return {
        ...state,
        stockAlert: action.payload.response,
        isLoading: false
      }

    case RegisterActionTypes.GET_STOCKALERT_FAILED:
      return {
        ...state,
        isLoading: false,
        isSubmitFailed: true,
        errorMessage: action.payload.response.error
      }

    default:
      return state;
  }
}
 
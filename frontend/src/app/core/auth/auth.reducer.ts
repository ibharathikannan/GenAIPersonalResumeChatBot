import { AuthenticatedUser } from './auth.models';
import { AuthActions, AuthActionTypes } from './auth.actions';
import { MenuAccessModel } from '@app/shared/models/menu-access.model';

export interface AuthState {
  isAuthenticated: boolean;
  token?: string;
  user?: AuthenticatedUser;
  isLoading: boolean;
  errorMessage?: string;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        isLoading: true,
        errorMessage: ''
      };

    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: action.payload.response,
        errorMessage: ''
      };

    case AuthActionTypes.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.response
      };

    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: ''
      };

    case AuthActionTypes.GET_AUTHENTICATED_USER:
      return {
        ...state,
        isLoading: true,
        errorMessage: ''
      };

    case AuthActionTypes.GET_AUTHENTICATED_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.response
      };

    case AuthActionTypes.GET_USER_ROLE_LIST:
      return {
        ...state,
        isLoading: true,
        errorMessage: ''
      };

    case AuthActionTypes.GET_USER_ROLE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false
      };

    case AuthActionTypes.GET_USER_ROLE_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.response
      };

    case AuthActionTypes.GET_USER_ROLE_MENU_LIST:
      return {
        ...state,
        isLoading: true,
        errorMessage: ''
      };

    case AuthActionTypes.GET_USER_ROLE_MENU_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false
      };

    case AuthActionTypes.GET_USER_ROLE_MENU_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.response
      };

    default:
      return state;
  }
}

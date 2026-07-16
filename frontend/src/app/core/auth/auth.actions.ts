import { Action } from '@ngrx/store';
import { AuthenticationModel } from '@app/core/auth/auth.models';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login successful',
  LOGIN_FAILED = '[Auth] Login failed',
  LOGOUT = '[Auth] Logout',
  GET_AUTHENTICATED_USER = '[Auth] Get Authenticated user',
  GET_AUTHENTICATED_USER_SUCCESS = '[Auth] Get Authenticated user Success',
  GET_USER_ROLE_LIST = '[Auth] Get user role list',
  GET_USER_ROLE_LIST_SUCCESS = '[Auth] Get user role list success',
  GET_USER_ROLE_LIST_FAIL = '[Auth] Get user role list fail',
  GET_USER_ROLE_MENU_LIST = '[Auth] Get user role menu list',
  GET_USER_ROLE_MENU_LIST_SUCCESS = '[Auth] Get user role menu list success',
  GET_USER_ROLE_MENU_LIST_FAIL = '[Auth] Get user role menu list fail',
}

export class ActionAuthLogin implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(readonly payload: { authModel: AuthenticationModel }) {}
}

export class ActionAuthLoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(readonly payload: { response: any }) {}
}

export class ActionAuthLoginFailed implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILED;
  constructor(readonly payload: { response: any }) {}
}

export class ActionAuthLogout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class ActionGetAuthUser implements Action {
  readonly type = AuthActionTypes.GET_AUTHENTICATED_USER;
}

export class ActionGetAuthUserSuccess implements Action {
  readonly type = AuthActionTypes.GET_AUTHENTICATED_USER_SUCCESS;
  constructor(readonly payload: { response: any }) {}
}

export class ActionGetUserRoleList implements Action {
  readonly type = AuthActionTypes.GET_USER_ROLE_LIST;
}

export class ActionGetUserRoleListSuccess implements Action {
  readonly type = AuthActionTypes.GET_USER_ROLE_LIST_SUCCESS;
  constructor(readonly payload: { response: any }) {}
}

export class ActionGetUserRoleListFail implements Action {
  readonly type = AuthActionTypes.GET_USER_ROLE_LIST_FAIL;
  constructor(readonly payload: { response: any }) {}
}

export class ActionGetUserRoleMenuList implements Action {
  readonly type = AuthActionTypes.GET_USER_ROLE_MENU_LIST;
  constructor(readonly payload: { roleList: string }) {}
}

export class ActionGetUserRoleMenuListSuccess implements Action {
  readonly type = AuthActionTypes.GET_USER_ROLE_MENU_LIST_SUCCESS;
  constructor(readonly payload: { response: any }) {}
}

export class ActionGetUserRoleMenuListFail implements Action {
  readonly type = AuthActionTypes.GET_USER_ROLE_MENU_LIST_FAIL;
  constructor(readonly payload: { response: any }) {}
}

export type AuthActions =
  | ActionAuthLogin
  | ActionAuthLoginSuccess
  | ActionAuthLoginFailed
  | ActionAuthLogout
  | ActionGetAuthUser
  | ActionGetAuthUserSuccess
  | ActionGetUserRoleList
  | ActionGetUserRoleListSuccess
  | ActionGetUserRoleListFail  
  | ActionGetUserRoleMenuList
  | ActionGetUserRoleMenuListSuccess
  | ActionGetUserRoleMenuListFail;
import {
  AuthActionTypes,
  ActionAuthLogin,
  ActionAuthLogout,
  ActionAuthLoginSuccess,
  ActionAuthLoginFailed,
  ActionGetAuthUser,
  ActionGetAuthUserSuccess,
  ActionGetUserRoleList,
  ActionGetUserRoleListSuccess,
  ActionGetUserRoleListFail,
  ActionGetUserRoleMenuList,
  ActionGetUserRoleMenuListSuccess,
  ActionGetUserRoleMenuListFail
} from './auth.actions';
import { AuthenticationModel } from '@app/core/auth/auth.models';

describe('Auth Actions', () => {
  const testAuthModel = new AuthenticationModel();
  testAuthModel.login = 'wi.tf@samsung.com';
  testAuthModel.password = 'VFR$5tgb';

  const payload: any = {};

  it('should create ActionAuthLogin action', () => {
    const action = new ActionAuthLogin({authModel: testAuthModel});
    expect(action.type).toEqual(AuthActionTypes.LOGIN);
  });

  it('should create ActionAuthLoginSuccess action', () => {
    const action = new ActionAuthLoginSuccess(payload);
    expect(action.type).toEqual(AuthActionTypes.LOGIN_SUCCESS);
  });

  it('should create ActionAuthLoginFailed action', () => {
    const action = new ActionAuthLoginFailed(payload);
    expect(action.type).toEqual(AuthActionTypes.LOGIN_FAILED);
  });

  it('should create ActionAuthLogout action', () => {
    const action = new ActionAuthLogout();
    expect(action.type).toEqual(AuthActionTypes.LOGOUT);
  });

  it('should create ActionGetAuthUser action', () => {
    const action = new ActionGetAuthUser();
    expect(action.type).toEqual(AuthActionTypes.GET_AUTHENTICATED_USER);
  });

  it('should create ActionGetAuthUserSuccess action', () => {
    const action = new ActionGetAuthUserSuccess(payload);
    expect(action.type).toEqual(AuthActionTypes.GET_AUTHENTICATED_USER_SUCCESS);
  });
  
  it('should create ActionGetUserRoleList action', () => {
    const action = new ActionGetUserRoleList();
    expect(action.type).toEqual(AuthActionTypes.GET_USER_ROLE_LIST);
  });

  it('should create ActionGetUserRoleListSuccess action', () => {
    const action = new ActionGetUserRoleListSuccess(payload);
    expect(action.type).toEqual(AuthActionTypes.GET_USER_ROLE_LIST_SUCCESS);
  });

  it('should create ActionGetUserRoleListFail action', () => {
    const action = new ActionGetUserRoleListFail(payload);
    expect(action.type).toEqual(AuthActionTypes.GET_USER_ROLE_LIST_FAIL);
  });

  it('should create ActionGetUserRoleList action', () => {
    const action = new ActionGetUserRoleMenuList(payload);
    expect(action.type).toEqual(AuthActionTypes.GET_USER_ROLE_MENU_LIST);
  });

  it('should create ActionGetUserRoleListSuccess action', () => {
    const action = new ActionGetUserRoleMenuListSuccess(payload);
    expect(action.type).toEqual(AuthActionTypes.GET_USER_ROLE_MENU_LIST_SUCCESS);
  });

  it('should create ActionGetUserRoleListFail action', () => {
    const action = new ActionGetUserRoleMenuListFail(payload);
    expect(action.type).toEqual(AuthActionTypes.GET_USER_ROLE_MENU_LIST_FAIL);
  });

});

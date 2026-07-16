import { Router } from '@angular/router';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { EMPTY, of, throwError } from 'rxjs';

import {
  LocalStorageService,
  ActionAuthLogin,
  ActionAuthLogout,
  NotificationService
} from '@app/core';

import { AuthEffects, AUTH_KEY } from './auth.effects';
import { AuthenticateService } from '@app/shared/services/authenticate.service';
import { ActionAuthLoginSuccess, ActionGetAuthUser, ActionGetAuthUserSuccess, ActionGetUserRoleList, ActionGetUserRoleListSuccess, ActionGetUserRoleMenuList, ActionGetUserRoleMenuListSuccess, ActionAuthLoginFailed, ActionGetUserRoleListFail, ActionGetUserRoleMenuListFail } from './auth.actions';
import { AuthenticationModel } from './auth.models';

describe('AuthEffects', () => {

  let authService: jasmine.SpyObj<AuthenticateService>;
  let router: jasmine.SpyObj<Router>;
  let nortificationService: jasmine.SpyObj<NotificationService>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
 
  const testAuthModel = new AuthenticationModel();
  testAuthModel.login = 'wi.tf@samsung.com';
  testAuthModel.password = 'VFR$5tgb';

  const response: any = {
    response: 'testToken'
  };

  const responseFailed: any = 'Login or password invalid!';

  beforeEach(() => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', [
      'setItem'
    ]);
    router = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    authService = jasmine.createSpyObj('authenticateService', ['authenticate', 'logout', 'getAuthenticatedUser','getUserRoleList', 'getUserRoleMenuID']);
  });

  
  describe('login', () => {    
    it('attempt login', () => {

      const actionLogin = new ActionAuthLogin({
        authModel: testAuthModel
      });

      const actionLoginSuccess = new ActionAuthLoginSuccess({
        response
      });

      const values = {
        a: actionLogin,
        s: actionLoginSuccess
      };
      const source = hot('a', values);
      const expected = cold('s', values);
      const actions = new Actions(source);

      authService.authenticate.and.returnValue(of(response));

      const effects = new AuthEffects(actions, authService, router, nortificationService, localStorageService );
      
      expect(effects.login).toBeObservable(expected);

    });

    /*
    it('should emit ActionAuthLoginFailed on wrong authentication', () => {
      const actionLogin = new ActionAuthLogin({
        authModel: testAuthModel
      });
      
      const error = 'Login or password invalid!';
      const actionLoginFailed = new ActionAuthLoginFailed({
        error
      } as any);

      const values = {
        a: actionLogin,
        s: actionLoginFailed
      };
      const source = hot('a', values);
      const expected = cold('s', values);
      const actions = new Actions(source);

      authService.authenticate.and.returnValue(throwError(error));

      const effects = new AuthEffects(actions, authService, router, nortificationService, localStorageService );

      expect(effects.login).toBeObservable(expected);
    });

    it('should emit ActionAuthLoginFailed on http error', () => {
      const actionLogin = new ActionAuthLogin({
        authModel: testAuthModel
      });

      const error = { error: 'ERROR'};
      const errorAction = [ new ActionAuthLoginFailed({
        error
      } as any) ];

      const values = {
        a: actionLogin,
        s: errorAction
      };
      const source = hot('a', values);
      const expected = cold('s', values);
      const actions = new Actions(source);

      authService.authenticate.and.returnValue(throwError(error));

      const effects = new AuthEffects(actions, authService, router, nortificationService, localStorageService );

      expect(effects.login).toBeObservable(expected);
    });*/
  });

  describe('loginsuccess', () => {
    it('should not dispatch any action', () => {
      const actions = new Actions(EMPTY);
      const effect = new AuthEffects(actions, authService, router, nortificationService, localStorageService );
      const metadata = getEffectsMetadata(effect);

      expect(metadata.loginsuccess).toEqual({ dispatch: false });
    });
    
    it('should call setItem on LocalStorageService', () => {
      const response = { response: 'testtoken'}
      const loginSuccessAction = new ActionAuthLoginSuccess(response);
      const source = cold('a', { a: loginSuccessAction });
      const actions = new Actions(source);
      const effect = new AuthEffects(actions, authService, router, nortificationService, localStorageService );

      effect.loginsuccess.subscribe(() => {
        expect(localStorageService.setItem).toHaveBeenCalledWith(AUTH_KEY, {
          isAuthenticated: true,
          token: 'testtoken'
        });
      });
    });
  });

  describe('logout', () => {

    it('should call setItem on LocalStorageService and navigate to login', () => {
      const logoutAction = new ActionAuthLogout();
      const source = cold('a', { a: logoutAction });
      const actions = new Actions(source);
      const effect = new AuthEffects(actions, authService, router, nortificationService, localStorageService );

      effect.logout.subscribe(() => {
        expect(localStorageService.setItem).toHaveBeenCalledWith(AUTH_KEY, {
          isAuthenticated: false,
          token: ''
        });
        
        expect(router.navigate).toHaveBeenCalledWith(['login']);
      });
    });
  });

  describe('getAuthenticatedUser', () => {

    it('should call ActionGetAuthUserSuccess on success', () => {
      const token = 'abc';
      const getAuthUser = new ActionGetAuthUser();
      const getAuthUserSuccess = new ActionGetAuthUserSuccess({response: token});
      
      const values = {
        a: getAuthUser,
        s: getAuthUserSuccess
      };
      const source = cold('a', values);
      const expected = cold('s', values);
      const actions = new Actions(source);

      const effect = new AuthEffects(actions, authService, router, nortificationService, localStorageService );

      authService.getAuthenticatedUser.and.returnValue(of(token));
      expect(effect.getAuthenticatedUser).toBeObservable(expected);

    });

    it('should emit ActionAuthLoginFailed on failure', () => {
      const error = 'ERROR!';

      const getAuthUserAction = new ActionGetAuthUser();
      const authLoginFailedAction = new ActionAuthLoginFailed({response: error});
      
      const values = {
        a: getAuthUserAction,
        s: authLoginFailedAction
      };
      const source = cold('a', values);
      const expected = cold('s', values);
      const actions = new Actions(source);

      const effect = new AuthEffects(actions, authService, router, nortificationService, localStorageService );

      authService.getAuthenticatedUser.and.returnValue(throwError(error));
      expect(effect.getAuthenticatedUser).toBeObservable(expected);

    });
  });

  describe('getUserRoleList', () => {

    it('should call ActionGetUserRoleListSuccess on success', () => {
      const testRespond = 'Admin';

      const getUserRoleListAction = new ActionGetUserRoleList();
      const getUserRoleListSuccessAction = new ActionGetUserRoleListSuccess({response: testRespond});
      
      const values = {
        a: getUserRoleListAction,
        s: getUserRoleListSuccessAction
      };
      const source = cold('a', values);
      const expected = cold('s', values);
      const actions = new Actions(source);

      const effect = new AuthEffects(actions, authService, router, nortificationService, localStorageService );

      authService.getUserRoleList.and.returnValue(of(testRespond));
      expect(effect.getUserRoleList).toBeObservable(expected);

    });

    it('should emit ActionGetUserRoleListFail on failure', () => {
      const error = 'ERROR!';

      const getUserRoleListAction = new ActionGetUserRoleList();
      const getUserRoleListFailAction = new ActionGetUserRoleListFail({response: error});
      
      const values = {
        a: getUserRoleListAction,
        s: getUserRoleListFailAction
      };
      const source = cold('a', values);
      const expected = cold('s', values);
      const actions = new Actions(source);

      const effect = new AuthEffects(actions, authService, router, nortificationService, localStorageService );

      authService.getUserRoleList.and.returnValue(throwError(error));
      expect(effect.getUserRoleList).toBeObservable(expected);

    });
  });

  describe('getUserRoleMenuID', () => {

    it('should call ActionGetUserRoleMenuListSuccess on success', () => {
      const testRespond = 'About';

      const getUserRoleListMenuAction = new ActionGetUserRoleMenuList({roleList: 'Admin'});
      const getUserRoleListMenuSuccessAction = new ActionGetUserRoleMenuListSuccess({response: testRespond});
      
      const values = {
        a: getUserRoleListMenuAction,
        s: getUserRoleListMenuSuccessAction
      };
      const source = cold('a', values);
      const expected = cold('s', values);
      const actions = new Actions(source);

      const effect = new AuthEffects(actions, authService, router, nortificationService, localStorageService );

      authService.getUserRoleMenuID.and.returnValue(of(testRespond));
      expect(effect.getUserRoleMenuList).toBeObservable(expected);

    });

    it('should emit ActionGetUserRoleMenuListFail on failure', () => {
      const error = 'ERROR!';

      const getUserRoleMenuListAction = new ActionGetUserRoleMenuList({ roleList: 'Admin'});
      const getUserRoleMenuListFailAction = new ActionGetUserRoleMenuListFail({response: error});
      
      const values = {
        a: getUserRoleMenuListAction,
        s: getUserRoleMenuListFailAction
      };
      const source = cold('a', values);
      const expected = cold('s', values);
      const actions = new Actions(source);

      const effect = new AuthEffects(actions, authService, router, nortificationService, localStorageService );

      authService.getUserRoleMenuID.and.returnValue(throwError(error));
      expect(effect.getUserRoleMenuList).toBeObservable(expected);

    });
  });

});

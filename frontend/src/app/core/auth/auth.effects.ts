import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, switchMap, catchError, map, mergeMap } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage/local-storage.service';

import {
  ActionAuthLogin,
  ActionAuthLoginSuccess,
  ActionAuthLogout,
  AuthActionTypes,
  ActionAuthLoginFailed,
  ActionGetAuthUser,
  ActionGetAuthUserSuccess,
  ActionGetUserRoleList,
  ActionGetUserRoleListSuccess,
  ActionGetUserRoleListFail,
  ActionGetUserRoleMenuList,
  ActionGetUserRoleMenuListFail,
  ActionGetUserRoleMenuListSuccess,
} from './auth.actions';
import { Observable, of } from 'rxjs';
import { AuthenticateService } from '@app/shared/services/authenticate.service';
import { NotificationService } from '../notifications/notification.service';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<Action>,
    private authService: AuthenticateService,
    private router: Router,
    private readonly notificationService: NotificationService,
    private localStorageService: LocalStorageService
  ) {}

  /* Login template
  @Effect({ dispatch: false })
  login = this.actions$.pipe(
    ofType<ActionAuthLogin>(AuthActionTypes.LOGIN),
    tap(() =>
      this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: true })
    )
  );  
  
  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType<ActionAuthLogout>(AuthActionTypes.LOGOUT),
    tap(() => {
      this.router.navigate(['login']);
      this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
    })
  );
    
  @Effect({ dispatch: false })
  loginfailed = this.actions$.pipe(
    ofType<ActionAuthLoginFailed>(AuthActionTypes.LOGIN_FAILED),
    tap(err => {
      this.notificationService.error(err.payload);
    })
  );
  */

  // multiple dispatches
  login: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<ActionAuthLogin>(AuthActionTypes.LOGIN),
    map(action => action.payload),
    switchMap(payload => this.authService.authenticate(payload.authModel)),
    catchError(error => of(new ActionAuthLoginFailed({ response: error }))),
    switchMap(response => {
      const actions = [];

      if (
        response === 'Login or password invalid!' ||
        response === 'Account is locked'
      ) {
        actions.push(new ActionAuthLoginFailed({ response: response }));
        this.notificationService.error(response.toString());
      } else {
        actions.push(new ActionAuthLoginSuccess({ response: response }));
        // actions.push(new ActionGetAuthUser());
        // actions.push(new ActionGetUserRoleList());
      }

      return actions;
    })
  ));

  loginsuccess = createEffect(() => this.actions$.pipe(
    ofType<ActionAuthLoginSuccess>(AuthActionTypes.LOGIN_SUCCESS),
    tap(user => {
      // this.authService.setToken(user.payload.response);
      this.localStorageService.setItem(AUTH_KEY, {
        isAuthenticated: true,
        token: user.payload.response
      });
      this.router.navigate(['about']);
    })
  ), { dispatch: false });

  logout = createEffect(() => this.actions$.pipe(
    ofType<ActionAuthLogout>(AuthActionTypes.LOGOUT),
    tap(() => {
      this.authService.logout();
      this.localStorageService.setItem(AUTH_KEY, {
        isAuthenticated: false,
        token: ''
      });
      this.router.navigate(['login']);
    })
  ), { dispatch: false });

  getAuthenticatedUser = createEffect(() => this.actions$.pipe(
    ofType<ActionGetAuthUser>(AuthActionTypes.GET_AUTHENTICATED_USER),
    switchMap((action: ActionGetAuthUser) =>
      this.authService.getAuthenticatedUser().pipe(
        map(response => {
          return new ActionGetAuthUserSuccess({ response: response });
        }),
        catchError(error => of(new ActionAuthLoginFailed({ response: error })))
      )
    )
  ));

  getUserRoleList = createEffect(() => this.actions$.pipe(
    ofType<ActionGetUserRoleList>(AuthActionTypes.GET_USER_ROLE_LIST),
    switchMap((action: ActionGetUserRoleList) =>
      this.authService.getUserRoleList().pipe(
        map(response => {
          return new ActionGetUserRoleListSuccess({ response: response.toString() });
        }),
        catchError(error => of(new ActionGetUserRoleListFail({ response: error })))
      )
    )
  ));

  getUserRoleMenuList = createEffect(() => this.actions$.pipe(
    ofType<ActionGetUserRoleMenuList>(AuthActionTypes.GET_USER_ROLE_MENU_LIST),
    switchMap((action: ActionGetUserRoleMenuList) =>
      this.authService.getUserRoleMenuID(action.payload.roleList).pipe(
        map(response => {
          return new ActionGetUserRoleMenuListSuccess({ response: response });
        }),
        catchError(error => of(new ActionGetUserRoleMenuListFail({ response: error })))
      )
    )
  ));
}

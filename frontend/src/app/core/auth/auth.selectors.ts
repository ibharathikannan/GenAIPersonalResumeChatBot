import { createSelector } from '@ngrx/store';

import { selectAuthState } from '../core.state';
import { AuthState } from '..';

export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

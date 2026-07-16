import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from '@env/environment';
import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { debug } from './meta-reducers/debug.reducer';
import { authReducer, AuthState } from './auth/auth.reducer';
import { RouterStateUrl } from './router/router.state';
import { registerReducer, RegisterState } from '@app/views/register/register.reducer';
import { faSellcast } from '@fortawesome/free-brands-svg-icons';
import { bookingReducer, BookingState } from '@app/views/booking/booking.reducer';


export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  router: routerReducer,
  register: registerReducer,
  booking: bookingReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage
];
if (!environment.production) {
  // metaReducers.unshift(storeFreeze);
  if (!environment.test) {
    metaReducers.unshift(debug);
  }
}

export const selectAuthState = createFeatureSelector<AppState, AuthState>(
  'auth'
);

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('router');

export interface AppState {
  auth: AuthState;
  router: RouterReducerState<RouterStateUrl>;
  register: RegisterState;
  booking: BookingState;
}

// For test method
export function createAppState() {
  return {
    auth: {
      isAuthenticated: false,
      isLoading: false,
      user: {
        id: 1,
        email: 'i.bharathikannan@gmail.com',
        userName: 'hans tan',
        subsidiaryId: 1
      },
      roleList: '',
      menuAccesses: []
    },
    booking: {
      isLoading: false,
      booking: {

      }
    },
    register: {
      email: '',
      emailhs: '',
      countryCode: '',
      step: 1,
      isRegisterd: false,
      isLoading: false,
      errorMessage: ''
    },
    subscribe: {
      isLoading: false,
      isSubscribe: false,
      errorMessage: ''
    },
    settings: {
      language: 'en',
      theme: 'DEFAULT-THEME',
      autoNightMode: false,
      nightTheme: 'NIGHT_MODE_THEME',
      stickyHeader: true,
      pageAnimations: true,
      pageAnimationsDisabled: false,
      elementsAnimations: true,
      hour: 0
    },
    router: {} as any
  };
}
import { authReducer, initialState, AuthState } from './auth.reducer';
import { AuthenticationModel, AuthenticatedUser } from './auth.models';
import { 
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
  ActionGetUserRoleMenuListFail,
  ActionGetUserRoleMenuListSuccess
} from './auth.actions';
import { MenuAccessModel } from '@app/shared/models/menu-access.model';

describe('AuthReducer', () => {
  const TEST_INITIAL_STATE: AuthState = {
    isAuthenticated: false,
    isLoading: false,
    roleList: '',
    menuAccesses: []
  };

  const authUser: AuthenticatedUser = {
    id: 1,
    email: 'wi.tf@samsung.com',
    userName: 'Admin',
    subsidiaryId: 1
  };

  const testAuthModel = new AuthenticationModel();
  testAuthModel.login = 'wi.tf@samsung.com';
  testAuthModel.password = 'VFR$5tgb';

  it('should return default state', () => {
    const action = {} as any;
    const state = authReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should call api login method and loading on login', () => {
    const action = new ActionAuthLogin( { authModel: testAuthModel } );
    const state = authReducer(TEST_INITIAL_STATE, action);

    expect(state.isLoading).toBe(true);
    expect(state.errorMessage).toBe('');
  });

  it('should set authentication to true on login', () => {
    const action = new ActionAuthLogin( { authModel: testAuthModel } );
    const state = authReducer(TEST_INITIAL_STATE, action);

    expect(state.isLoading).toBe(true);
    expect(state.errorMessage).toBe('');
  });

  it('should set token and authentication to true on login success', () => {
    const response = { response: 'testtoken'};
    const action = new ActionAuthLoginSuccess( response );
    const state = authReducer(TEST_INITIAL_STATE, action);

    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe('testtoken');
    expect(state.errorMessage).toBe('');
  });

  it('should set error message on login failed', () => {
    const response = { response: 'errors'};
    const action = new ActionAuthLoginFailed( response );
    const state = authReducer(TEST_INITIAL_STATE, action);

    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.errorMessage).toBe('errors');
  });

  it('should set authentication to false and clear token on logout', () => {
    const action = new ActionAuthLogout();
    const state = authReducer(TEST_INITIAL_STATE, action);

    expect(state.isAuthenticated).toBe(false);
    expect(state.token).toBe('');
  });

  it('should call api get authenticate method and loading on get authenticated user', () => {
    const action = new ActionGetAuthUser();
    const state = authReducer(TEST_INITIAL_STATE, action);

    expect(state.isLoading).toBe(true);
    expect(state.errorMessage).toBe('');
  });

  it('should save authenticated user to store on get authenticated user', () => {
    const response = { response: authUser };
    const action = new ActionGetAuthUserSuccess( response );
    const state = authReducer(TEST_INITIAL_STATE, action);

    expect(state.isLoading).toBe(false);
    expect(state.user).toBe(authUser);
  });

  it('get user role list action should update the state to loading ', () => {
    const action = new ActionGetUserRoleList();
    const state = authReducer(TEST_INITIAL_STATE, action);

    expect(state.isLoading).toBe(true);
    expect(state.errorMessage).toBe('');
  });

  it('get user role list success action should update the state to test response', () => {
    const roleList = [ 'Admin', 'User']
    const action = new ActionGetUserRoleListSuccess({response: roleList});
    const state = authReducer(TEST_INITIAL_STATE, action);

    expect(state.isLoading).toBe(false);
    expect(state.roleList).toBe(roleList);
  });

  it('get user role list fail action should update the state to fail', () => {
    const error = 'error!';
    const action = new ActionGetUserRoleListFail({response: error});
    const state = authReducer(TEST_INITIAL_STATE, action);

    expect(state.isLoading).toBe(false);
    expect(state.errorMessage).toBe('error!');
  });

  it('get user role menu list action should update the state to loading ', () => {
    const action = new ActionGetUserRoleMenuList({roleList: 'Admin, User'});
    const state = authReducer(TEST_INITIAL_STATE, action);

    expect(state.isLoading).toBe(true);
    expect(state.errorMessage).toBe('');
  });

  it('get user role list success action should update the state to test response', () => {
    const menuAccessModel = new MenuAccessModel();
    menuAccessModel.Link = '/About'
    const menuAccesses = { response: {
      list: [
      ]
    }};
    menuAccesses.response.list.push(menuAccessModel);

    const action = new ActionGetUserRoleMenuListSuccess(menuAccesses);
    const state = authReducer(TEST_INITIAL_STATE, action);

    expect(state.isLoading).toBe(false);
    expect(state.menuAccesses).toBe(menuAccesses.response.list);
  });

  it('get user role list fail action should update the state to fail', () => {
    const error = 'error!';
    const action = new ActionGetUserRoleMenuListFail({response: error});
    const state = authReducer(TEST_INITIAL_STATE, action);

    expect(state.isLoading).toBe(false);
    expect(state.errorMessage).toBe('error!');
  });

});

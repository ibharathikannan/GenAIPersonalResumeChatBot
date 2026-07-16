import { selectAuth, 
  selectIsAuthenticated, 
  selectAuthUser, 
  selectUserRoleList, 
  selectUserRoleMenuList } from './auth.selectors';
import { createAppState } from '../core.state';

describe('Auth Selectors', () => {  
  const state = createAppState();

  it('selectAuth', () => {
    expect(selectAuth(state)).toBe(state.auth);
  });

  it('selectIsAuthenticated', () => {
    expect(selectIsAuthenticated(state)).toBe(false);
  });

  it('selectIsAuthenticated', () => {
    expect(selectAuthUser(state)).toBe(state.auth.user);
  });

  it('selectUserRoleList', () => {
    expect(selectUserRoleList(state)).toBe('');
  });

  it('selectUserRoleMenuList', () => {
    expect(selectUserRoleMenuList(state)).toBe(state.auth.menuAccesses);
  });

});



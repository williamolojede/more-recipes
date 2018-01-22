import reducer from '../../reducers/auth';
import * as types from '../../actions/types';
import userMock from '../__mocks__/user.mock';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    const { isAuthenticated, currentUser } = reducer(undefined, {});

    expect(isAuthenticated).toEqual(true);
    expect(currentUser.id).toEqual(0);
    expect(currentUser.fullname).toEqual('');
  });

  it('should update the store when login succeeds', () => {
    const {
      isAuthenticated,
      currentUser,
      errorMessage,
      token: userToken
    } = reducer(undefined, {
      type: types.LOGIN_SUCCESS,
      currentUser: userMock,
      token,
    });

    expect(isAuthenticated).toEqual(true);
    expect(currentUser.id).toEqual(userMock.id);
    expect(errorMessage).toEqual('');
    expect(userToken).toEqual(token);
  });

  it('should update the store with current user details', () => {
    const { isAuthenticated, currentUser } = reducer(undefined, {
      type: types.RECEIVE_CURRENT_USER,
      user: userMock
    });

    expect(isAuthenticated).toBe(true);
    expect(currentUser.id).toBe(userMock.id);
    expect(currentUser.fullname).toBe(userMock.fullname);
  });

  it('should update the store when user is logged out', () => {
    const { isAuthenticated, currentUser } = reducer(undefined, {
      type: types.LOGOUT,
      isAuthenticated: false
    });

    expect(isAuthenticated).toBe(false);
    expect(currentUser.id).toBe(0);
    expect(currentUser.fullname).toBe('');
  });

  it('should update the store when theres an error logging user in', () => {
    const { isAuthenticated, currentUser, errorMessage } = reducer(undefined, {
      type: types.LOGIN_FAILURE,
      isAuthenticated: false,
      message: 'something went wrong with login'
    });

    expect(isAuthenticated).toBe(false);
    expect(currentUser.id).toBe(0);
    expect(currentUser.fullname).toBe('');
    expect(errorMessage).toBe('something went wrong with login');
  });
});

import axios from 'axios';

import { setFetching } from './fetching';
import { receiveAuth, handleAuthSuccess, handleAuthFailure } from './auth';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './types';

const logout = () => ({
  type: LOGOUT,
});

const loginUser = (creds) => {
  const body = {
    user: {
      email: creds.email,
      password: creds.password
    }
  };

  return (dispatch) => {
    dispatch(setFetching());
    return axios.post('/api/v1/users/login', body)
      .then(res => handleAuthSuccess(res, dispatch, LOGIN_SUCCESS))
      .catch(err => handleAuthFailure(err, dispatch, LOGIN_FAILURE));
  };
};

// add user and token to the store
export const setUserData = ({ user, token }) => (dispatch) => {
  dispatch(receiveAuth(LOGIN_SUCCESS, { user, token }));
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logout());
};

export default loginUser;

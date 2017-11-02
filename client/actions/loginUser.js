import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { setFetching, unsetFetching } from './fetching';
import { receiveAuth, handleAuthSuccess, handleAuthFailure } from './auth';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from './types';

const receiveLogout = () => ({
  type: LOGOUT_SUCCESS,
});

const loginUser = (creds) => {
  const body = {
    auth: {
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
  dispatch(setFetching());
  localStorage.removeItem('token');
  dispatch(
    batchActions([
      receiveLogout(),
      unsetFetching()
    ])
  );
};

export default loginUser;

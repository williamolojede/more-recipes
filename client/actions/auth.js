import { batchActions } from 'redux-batched-actions';

import { unsetFetching } from './fetching';
import {
  REMOVE_AUTH_ERROR_MESSAGE
} from './types';

export const receiveAuth = (type, { user, token }) => ({
  type,
  isAuthenticated: true,
  token,
  user,
});

export const authError = (type, message) => ({
  type,
  isAuthenticated: false,
  message
});

export const removeAuthErrorMessage = () => ({
  type: REMOVE_AUTH_ERROR_MESSAGE,
  message: ''
});

export const handleAuthSuccess = (res, dispatch, type) => {
  const { user, token } = res.data;
  // If signup was successful, set the token in local storage
  localStorage.setItem('token', token);
  // Dispatch the success action and unset fetching
  dispatch(batchActions([
    receiveAuth(type, { user, token }),
    unsetFetching()
  ]));
};

export const handleAuthFailure = (err, dispatch, type) => {
  // Dispatch the error action and unset fetching
  if (err.response) {
    dispatch(batchActions([
      authError(type, err.response.data.message),
      unsetFetching()
    ]));
    setTimeout(() => {
      dispatch(removeAuthErrorMessage());
    }, 2000);
  }
};

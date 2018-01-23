import instance from '../config/axios';
import * as actionTypes from './types';

import { setFetching, unsetFetching } from './fetching';
import { showNotification } from './notification';

const receiveUserProfile = user => ({
  type: actionTypes.RECEIVE_CURRENT_USER,
  user,
});

export const fetchUserProfile = id => (dispatch) => {
  dispatch(setFetching());
  return instance.get(`/users/${id}`)
    .then((res) => {
      dispatch(receiveUserProfile(res.data.user));
      dispatch(unsetFetching());
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.RECEIVE_CURRENT_USER_ERROR,
        errorMessage: err.response.data.message
      });
      dispatch(unsetFetching());
    });
};

export const updateUserProfile = user => (dispatch) => {
  const {
    id: userId,
    email,
    imgUrl,
    fullname
  } = user;

  return instance.put(`/users/${userId}`, { update: { email, imgUrl, fullname } })
    .then((res) => {
      dispatch(receiveUserProfile(res.data.user));
      dispatch(showNotification({ message: res.data.message, type: 'success' }));
    })
    .catch((err) => {
      dispatch(showNotification({ message: err.response.data.message, type: 'error' }));
    });
};

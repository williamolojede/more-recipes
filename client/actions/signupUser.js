import axios from 'axios';
import { setFetching } from './fetching';
import {
  handleAuthSuccess,
  handleAuthFailure
} from './auth';

import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from './types';

const signupUser = (creds) => {
  const body = {
    user: creds
  };
  return (dispatch) => {
    dispatch(setFetching());
    return axios.post('/api/v1/users/signup', body)
      .then(res => handleAuthSuccess(res, dispatch, SIGNUP_SUCCESS))
      .catch(err => handleAuthFailure(err, dispatch, SIGNUP_FAILURE));
  };
};

export default signupUser;

import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { setFetching, unsetFetching } from './fetching';
import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from './types';

const receiveSignup = ({ user, token }) => ({
  type: SIGNUP_SUCCESS,
  isAuthenticated: true,
  token,
  user,
});


const signupError = message => ({
  type: SIGNUP_FAILURE,
  isAuthenticated: false,
  message
});


const signupUser = (creds) => {
  const body = {
    user: {
      email: creds.email,
      password: creds.password,
      fullname: creds.fullname
    }
  };

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(setFetching());
    return axios.post('/api/v1/users/signup', body)
      .then((res) => {
        const { user, token } = res.data;
        // If signup was successful, set the token in local storage
        localStorage.setItem('token', token);
        // Dispatch the success action and unset fetching
        dispatch(
          batchActions([
            receiveSignup({ user, token }),
            unsetFetching()
          ])
        );
      })
      .catch((err) => {
        // Dispatch the error action and unset fetching
        if (err.response) {
          dispatch(
            batchActions([
              signupError(err.response.data.message),
              unsetFetching()
            ])
          );
        }
      });
  };
};

export default signupUser;

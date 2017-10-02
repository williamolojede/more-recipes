import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { setFetching, unsetFetching } from './fetching';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from './types';

const receiveLogin = ({ user, token }) => ({
  type: LOGIN_SUCCESS,
  isAuthenticated: true,
  token,
  user,
});

const receiveLogout = () => ({
  type: LOGOUT_SUCCESS,
});

const loginError = message => ({
  type: LOGIN_FAILURE,
  isAuthenticated: false,
  message
});


const loginUser = (creds) => {
  const body = {
    auth: {
      email: creds.email,
      password: creds.password
    }
  };

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(setFetching());
    return axios.post('/api/v1/users/login', body)
      .then((res) => {
        const { user, token } = res.data;
        // If login was successful, set the token in local storage
        localStorage.setItem('token', token);
        // Dispatch the success action and unset fetching
        dispatch(
          batchActions([
            receiveLogin({ user, token }),
            unsetFetching()
          ])
        );
      })
      .catch((err) => {
        // Dispatch the error action and unset fetching
        if (err.response) {
          dispatch(
            batchActions([
              loginError(err.response.data.message),
              unsetFetching()
            ])
          );
        }
      });
  };
};

// add user and token to the store
export const setUserData = ({ user, token }) => (dispatch) => {
  dispatch(receiveLogin({ user, token }));
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

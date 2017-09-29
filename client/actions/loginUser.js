import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { setFetching, unsetFetching } from './fetching';

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const receiveLogin = ({ user, token }) => ({
  type: LOGIN_SUCCESS,
  isAuthenticated: true,
  token,
  user,
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


export default loginUser;

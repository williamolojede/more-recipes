import axios from 'axios';

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';


const requestLogin = creds => ({
  type: LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds
});

const receiveLogin = ({ user, token }) => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  token,
  user,
});


const loginError = message => ({
  type: LOGIN_FAILURE,
  isFetching: false,
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
    dispatch(requestLogin(creds));
    return axios.post('/api/v1/users/login', body)
      .then((res) => {
        const { user, token } = res.data;
        // If login was successful, set the token in local storage
        localStorage.setItem('token', token);
        // Dispatch the success action
        dispatch(receiveLogin({ user, token }));
      })
      .catch((err) => {
        // Dispatch the error action
        if (err.response) {
          dispatch(loginError(err.response.data.message));
        }
      });
  };
};

export const setUserData = ({ user, token }) => (dispatch) => {
  dispatch(receiveLogin({ user, token }));
};


export default loginUser;
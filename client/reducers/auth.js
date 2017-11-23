import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
  REMOVE_AUTH_ERROR_MESSAGE
} from '../actions/types';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token')
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        errorMessage: '',
        token: action.token,
        user: action.user
      });
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
    case REMOVE_AUTH_ERROR_MESSAGE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        errorMessage: action.message
      });
    case LOGOUT:
      return Object.assign({}, state, {
        isAuthenticated: false
      });
    default:
      return state;
  }
};


export default auth;

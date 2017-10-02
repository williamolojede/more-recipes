import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_SUCCESS
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
      return Object.assign({}, state, {
        isAuthenticated: false,
        errorMessage: action.message
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false
      });
    default:
      return state;
  }
};


export default auth;

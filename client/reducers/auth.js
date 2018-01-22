import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
  REMOVE_AUTH_ERROR_MESSAGE,
  RECEIVE_CURRENT_USER
} from '../actions/types';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  currentUser: {
    id: 0,
    fullname: ''
  }
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        errorMessage: '',
        token: action.token,
        currentUser: action.currentUser
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
    case RECEIVE_CURRENT_USER:
      return { ...state, currentUser: action.user };
    default:
      return state;
  }
};


export default auth;

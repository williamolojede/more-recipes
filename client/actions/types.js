// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// FOR API CALLS
export const SET_FETCHING = 'SET_FETCHING';
// note: doesn't mean its successful just that the api responded
export const UNSET_FETCHING = 'UNSET_FETCHING';

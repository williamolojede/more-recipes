/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import { logoutUser } from './actions/loginUser';
import { fetchUserProfile } from './actions/userProfile';

import decodeToken from './utils/decodeToken';


// import css
import './sass/main.scss';

import App from './components/App.jsx';

const rootEl = document.getElementById('root');

// ensures that if the user is logged their
// user token and data will be in the store even they refresh
if (localStorage.token) {
  const { id, exp } = decodeToken();

  // check if token has expired
  if (exp < Math.floor(Date.now() / 1000)) {
    // log user out
    store.dispatch(logoutUser());
  } else {
    // add user data and token to auth store
    store.dispatch(fetchUserProfile(id));
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);

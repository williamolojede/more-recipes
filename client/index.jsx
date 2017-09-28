/**
 * Client entry point
 */
import React from 'react';
import jwt from 'jsonwebtoken';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { setUserData } from './actions/loginUser';


// import css
import css from './sass/main.scss';

import App from './components/App.jsx';

const rootEl = document.getElementById('root');

// ensures that if the user is logged their
// user token and data will be in the store even they refresh
if (localStorage.token) {
  const token = localStorage.getItem('token');
  const { user } = jwt.decode(token);
  store.dispatch(setUserData({ token, user }));
}
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);

/**
 * Client entry point
 */
import React from 'react';
import jwt from 'jsonwebtoken';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';


// import css
import css from './sass/main.scss';

import App from './components/App.jsx';

const rootEl = document.getElementById('root');

if (localStorage.token) {
  const token = localStorage.getItem('token');
  console.log(jwt.decode(token));
  // TODO: decode token an add user and also token to auth in store
  // api needs to send token which contains the whole user details and not just the id
}
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);

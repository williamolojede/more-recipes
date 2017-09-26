/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

// import css
import css from './sass/main.scss';

import App from './components/App.jsx';

const rootEl = document.getElementById('root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);

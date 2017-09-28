import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    middleware
  )
);

// const store = createStore(rootReducer);

export default store;

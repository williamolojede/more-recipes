import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { enableBatching } from 'redux-batched-actions';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const store = createStore(
  enableBatching(rootReducer), // to enable calling dispacth with multiple actions
  compose(
    applyMiddleware(
      thunk,
      middleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

// const store = createStore(rootReducer);

export default store;

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk
  )
);

// const store = createStore(rootReducer);

export default store;

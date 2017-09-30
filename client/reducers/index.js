/**
 * Root Reducer
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// REDUCERS
import auth from './auth';
import isFetching from './isFetching';

const rootReducer = combineReducers({
  auth,
  isFetching,
  router: routerReducer
});


export default rootReducer;

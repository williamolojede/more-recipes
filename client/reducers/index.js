/**
 * Root Reducer
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// REDUCERS
import auth from './auth';

const rootReducer = combineReducers({
  auth,
  router: routerReducer
});


export default rootReducer;

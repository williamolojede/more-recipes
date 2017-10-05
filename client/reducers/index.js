/**
 * Root Reducer
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// REDUCERS
import auth from './auth';
import isFetching from './isFetching';
import recipes from './recipes';
import recipe from './recipe';

const rootReducer = combineReducers({
  auth,
  isFetching,
  recipes,
  recipe,
  router: routerReducer
});


export default rootReducer;

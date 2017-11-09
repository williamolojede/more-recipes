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
import userProfile from './userProfile';
import notification from './notification';


const rootReducer = combineReducers({
  auth,
  isFetching,
  recipes,
  recipe,
  userProfile,
  notification,
  router: routerReducer
});


export default rootReducer;

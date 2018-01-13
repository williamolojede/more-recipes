/**
 * Root Reducer
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// REDUCERS
import auth from './auth';
import isFetching from './isFetching';
import topRecipes from './topRecipes';
import recipe from './recipe';
import recipeReviews from './recipeReviews';
import userProfile from './userProfile';
import notification from './notification';


const rootReducer = combineReducers({
  auth,
  isFetching,
  topRecipes,
  recipe,
  recipeReviews,
  userProfile,
  notification,
  router: routerReducer
});


export default rootReducer;

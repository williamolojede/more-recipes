/**
 * Root Reducer
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// REDUCERS
import auth from './auth';
import isFetching from './isFetching';
import topRecipes from './topRecipes';
import singleRecipe from './recipe';
import recipeReviews from './recipeReviews';
import notification from './notification';
import personalRecipes from './personalRecipes';
import favoriteRecipes from './favoriteRecipes';


const rootReducer = combineReducers({
  auth,
  isFetching,
  topRecipes,
  singleRecipe,
  recipeReviews,
  notification,
  personalRecipes,
  favoriteRecipes,
  router: routerReducer
});


export default rootReducer;

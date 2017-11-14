/**
 * Reducer for All Recipe
 */

import { RECIEVE_TOP_RATED_RECIPE } from '../actions/types';

const topRecipes = (state = {}, action) => {
  switch (action.type) {
    case RECIEVE_TOP_RATED_RECIPE:
      return { recipes: action.recipes, metaData: action.metaData };
    default:
      return state;
  }
};


export default topRecipes;

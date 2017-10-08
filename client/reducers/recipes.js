/**
 * Reducer for All Recipe
 */

import { RECIEVE_TOP_RATED_RECIPE } from '../actions/types';

const recipes = (state = [], action) => {
  switch (action.type) {
    case RECIEVE_TOP_RATED_RECIPE:
      return action.recipes;
    default:
      return state;
  }
};


export default recipes;

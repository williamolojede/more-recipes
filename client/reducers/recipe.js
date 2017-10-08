/**
 * Reducer for a Single Recipe
 */
import { RECIEVE_SINGLE_RECIPE } from '../actions/types';

const recipe = (state = {}, action) => {
  switch (action.type) {
    case RECIEVE_SINGLE_RECIPE:
      return Object.assign({}, state, action.recipe);
    default:
      return state;
  }
};

export default recipe;

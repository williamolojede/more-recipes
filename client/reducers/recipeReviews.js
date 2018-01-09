/**
 * Reducer for a Single Recipe
 */
import { RECEIVE_RECIPE_REVIEWS } from '../actions/types';

const recipeReviews = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_RECIPE_REVIEWS:
      return action.reviews;
    default:
      return state;
  }
};

export default recipeReviews;

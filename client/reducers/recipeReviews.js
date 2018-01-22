import {
  RECEIVE_RECIPE_REVIEWS,
  FETCH_RECIPE_REVIEWS_ERROR
} from '../actions/types';

const initialState = {
  reviews: [],
  pagination: {
    last: 1,
  },
  errorMessage: ''
};

const recipeReviews = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_RECIPE_REVIEWS: {
      const { reviews, pagination } = action.recipeReviews;
      return { ...state, reviews, pagination };
    }
    case FETCH_RECIPE_REVIEWS_ERROR:
      return { ...state, errorMessage: action.errorMessage };
    default:
      return state;
  }
};

export default recipeReviews;

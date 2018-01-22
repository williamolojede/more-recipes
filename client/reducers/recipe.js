/**
 * Reducer for a Single Recipe
 */
import {
  RECEIVE_SINGLE_RECIPE,
  FETCH_SINGLE_RECIPE_ERROR,
  RESET_SINGLE_RECIPE
} from '../actions/types';
import defaultConfig from '../config/default';

export const initialState = {
  recipe: {
    id: 1,
    name: '',
    description: '',
    img_url: defaultConfig.recipeImgUrl,
    ingredients: [],
    instructions: [],
    upVoteCount: 0,
    downVoteCount: 0,
    favoriteCount: 0,
    viewCount: 0
  },
  errorMessage: ''
};

const singleRecipe = (state = initialState, { type, recipe, errorMessage }) => {
  switch (type) {
    case RECEIVE_SINGLE_RECIPE:
      return { ...state, ...{ recipe } };
    case FETCH_SINGLE_RECIPE_ERROR:
      return { ...state, ...{ errorMessage } };
    case RESET_SINGLE_RECIPE:
      return initialState;
    default:
      return state;
  }
};

export default singleRecipe;

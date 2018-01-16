import {
  RECIEVE_TOP_RATED_RECIPE,
  FETCH_TOP_RECIPES_ERROR
} from '../actions/types';

const initialState = {
  recipes: [],
  pagination: {
    last: 1,
  },
  errorMessage: ''
};

const topRecipes = (state = initialState, { type, recipes, pagination, errorMessage }) => {
  switch (type) {
    case RECIEVE_TOP_RATED_RECIPE:
      return { ...state, ...{ recipes, pagination } };
    case FETCH_TOP_RECIPES_ERROR:
      return { ...state, ...{ errorMessage } };
    default:
      return state;
  }
};


export default topRecipes;

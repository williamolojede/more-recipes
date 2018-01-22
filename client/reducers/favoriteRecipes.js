import {
  RECEIVE_FAVORITE_RECIPES,
} from '../actions/types';

const initialState = {
  recipes: [],
  pagination: {
    last: 1,
  },
  errorMessage: ''
};

const favoriteRecipes = (state = initialState, { type, recipes, pagination }) => {
  switch (type) {
    case RECEIVE_FAVORITE_RECIPES:
      return { ...state, ...{ recipes, pagination } };
    default:
      return state;
  }
};


export default favoriteRecipes;

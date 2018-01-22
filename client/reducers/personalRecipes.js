import {
  RECEIVE_PERSONAL_RECIPES,
} from '../actions/types';

const initialState = {
  recipes: [],
  pagination: {
    last: 1,
  },
  errorMessage: ''
};

const personalRecipes = (state = initialState, { type, recipes, pagination }) => {
  switch (type) {
    case RECEIVE_PERSONAL_RECIPES:
      return { ...state, ...{ recipes, pagination } };
    default:
      return state;
  }
};


export default personalRecipes;

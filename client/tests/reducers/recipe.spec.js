import reducer, { initialState } from '../../reducers/recipe';
import * as types from '../../actions/types';
import recipesMock from '../__mocks__/recipes.mock';

const recipeMock = recipesMock.recipes[1];

describe('single recipe reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update the store with a new recipe detail when received', () => {
    const { recipe, errorMessage } = reducer(undefined, {
      type: types.RECEIVE_SINGLE_RECIPE,
      recipe: recipeMock
    });

    expect(recipe.name).toEqual(recipeMock.name);
    expect(errorMessage).toEqual(initialState.errorMessage);
  });

  it('should update the store when an error message is received', () => {
    const { recipe, errorMessage } = reducer(undefined, {
      type: types.FETCH_SINGLE_RECIPE_ERROR,
      errorMessage: 'something bad happened'
    });

    expect(recipe.name).toEqual(initialState.recipe.name);
    expect(errorMessage).toEqual('something bad happened');
  });

  it('should reset store back to the initial state', () => {
    const { recipe, errorMessage } = reducer(undefined, {
      type: types.RESET_SINGLE_RECIPE
    });

    expect(recipe.name).toEqual(initialState.recipe.name);
    expect(errorMessage).toEqual(initialState.errorMessage);
  });
});

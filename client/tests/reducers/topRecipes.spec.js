import reducer from '../../reducers/topRecipes';
import * as types from '../../actions/types';
import recipesMock from '../__mocks__/recipes.mock';

describe('top recipes reducer', () => {
  it('should return the initial state', () => {
    const { recipes, errorMessage, pagination } = reducer(undefined, {});

    expect(recipes.length).toEqual(0);
    expect(pagination.last).toEqual(1);
    expect(errorMessage).toEqual('');
  });

  it('should update the store when top recipes are received', () => {
    const { recipes, pagination, errorMessage } = reducer(undefined, {
      type: types.RECEIVE_TOP_RATED_RECIPES,
      recipes: recipesMock.recipes,
      pagination: recipesMock.pagination
    });

    expect(recipes.length).toEqual(recipesMock.recipes.length);
    expect(pagination.last).toEqual(recipesMock.pagination.last);
    expect(errorMessage).toEqual('');
  });

  it('should update the store when an error message is received', () => {
    const { recipes, errorMessage, pagination } = reducer(undefined, {
      type: types.FETCH_TOP_RECIPES_ERROR,
      errorMessage: 'something bad happened'
    });

    expect(recipes.length).toEqual(0);
    expect(pagination.last).toEqual(1);
    expect(errorMessage).toEqual('something bad happened');
  });
});

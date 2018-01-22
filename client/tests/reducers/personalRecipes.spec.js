import reducer from '../../reducers/personalRecipes';
import * as types from '../../actions/types';
import recipesMock from '../__mocks__/recipes.mock';

describe('personal recipes reducer', () => {
  it('should return the initial state', () => {
    const { recipes, errorMessage, pagination } = reducer(undefined, {});

    expect(recipes.length).toEqual(0);
    expect(pagination.last).toEqual(1);
    expect(errorMessage).toEqual('');
  });

  it('should update the store when personal recipes are received', () => {
    const { recipes, pagination, errorMessage } = reducer(undefined, {
      type: types.RECEIVE_PERSONAL_RECIPES,
      recipes: recipesMock.recipes,
      pagination: recipesMock.pagination
    });

    expect(recipes.length).toEqual(recipesMock.recipes.length);
    expect(pagination.last).toEqual(recipesMock.pagination.last);
    expect(errorMessage).toEqual('');
  });
});

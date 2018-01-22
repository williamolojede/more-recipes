import React from 'react';
import { PureFavoriteRecipesPage } from '../../../components/pages/FavoriteRecipesPage';
import recipesMock from '../../__mocks__/recipes.mock';

function setup() {
  const props = {
    dispatch: jest.fn(),
    isFetching: false,
    recipes: [],
    pagination: {
      last: 1,
    }
  };
  const wrapper = shallow(<PureFavoriteRecipesPage {...props} />);

  return {
    wrapper
  };
}

describe('Favorite Recipes Page', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a preloader', () => {
    const { wrapper } = setup();
    wrapper.setProps({ isFetching: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a list of recipes', () => {
    const { wrapper } = setup();
    wrapper.setProps({
      recipes: recipesMock.recipes,
      pagination: recipesMock.pagination
    });
    expect(wrapper).toMatchSnapshot();
  });

  describe('handlePageClick', () => {
    it('should update currentPage in state and trigger action to fetch recipes for the next page', () => {
      const { wrapper } = setup();
      const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
      wrapper.instance().handlePageClick({ selected: 1 });

      expect(wrapper.instance().state.currentPage).toBe(2);
      // 2 because dispatch has been called first in CWM
      expect(dispatchSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('removeRecipe', () => {
    it('should promt user to confirm delete and then dispatch an action to delete recipe', () => {
      const { wrapper } = setup();
      // const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
      wrapper.instance().removeRecipe(1);
    });
  });
});

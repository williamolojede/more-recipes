import React from 'react';
import RecipeTableListing from '../../../../components/pages/Profile/RecipeTableListing';
import recipes, { favoriteRecipes } from '../../../../__mocks__/recipes.mock';

function setup(type, asOwner, recipesData) {
  const props = {
    type,
    asOwner,
    recipes: recipesData,
    removeRecipe: jest.fn()
  };
  const wrapper = shallow(<RecipeTableListing {...props} />);

  return {
    wrapper
  };
}


describe('RecipeTableListing', () => {
  describe('type: Favorites', () => {
    const type = 'favorites';
    it('should render with right amount of elements if no recipes', () => {
      const { wrapper } = setup(type, true, []);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render with right amount of elements if no recipes and asOwner: false', () => {
      const { wrapper } = setup(type, false, []);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render list of recipes without actions if not owner', () => {
      const { wrapper } = setup(type, false, favoriteRecipes());
      expect(wrapper.find('th').length).toBe(1);
      expect(wrapper.find('RecipeTableListingRow').length).toBe(wrapper.instance().state.limit);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render list of recipes with actions if owner', () => {
      const { wrapper } = setup(type, true, favoriteRecipes());
      expect(wrapper.find('th').length).toBe(2);
      expect(wrapper.find('RecipeTableListingRow').length).toBe(wrapper.instance().state.limit);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('type: Personal-Recipes', () => {
    const type = 'personal-recipes';
    it('should render with right amount of elements if no recipes', () => {
      const { wrapper } = setup(type, true, []);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render with right amount of elements if no recipes and asOwner: false', () => {
      const { wrapper } = setup(type, false, []);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render list of recipes without actions if not owner', () => {
      const { wrapper } = setup(type, false, recipes);
      expect(wrapper.find('th').length).toBe(1);
      expect(wrapper.find('RecipeTableListingRow').length).toBe(wrapper.instance().state.limit);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render list of recipes with actions if owner', () => {
      const { wrapper } = setup(type, true, recipes);
      expect(wrapper.find('th').length).toBe(2);
      expect(wrapper.find('RecipeTableListingRow').length).toBe(wrapper.instance().state.limit);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('getRecipesForPage', () => {
    it('should do nothing if called to get recipes for the currentPage', () => {
      const { wrapper } = setup('favorites', true, []);
      expect(wrapper.instance().getRecipesForPage(1)).toBe(undefined);
      expect(wrapper.instance().state.currentPage)
        .toBe(1);
    });

    it('should do nothing if called to get recipes for pages outside available pages', () => {
      const { wrapper } = setup('personal-recipes', true, recipes);
      expect(wrapper.instance().getRecipesForPage(-1)).toBe(undefined);
      expect(wrapper.instance().getRecipesForPage(100)).toBe(undefined);
      expect(wrapper.instance().state.currentPage)
        .toBe(1);
    });

    it('should update currentpage state when called within range', () => {
      const { wrapper } = setup('personal-recipes', true, recipes);
      wrapper.instance().getRecipesForPage(2);
      expect(wrapper.instance().state.currentPage).toBe(2);
      // this will break depending on the length of `recipes` and `...state.limit`
      expect(wrapper.instance().state.recipes.length)
        .toBe(recipes.length % wrapper.instance().state.limit);
    });
  });
});

import React from 'react';
import TopRatedRecipeList from '../../../components/shared/TopRatedRecipeList';
import recipesMock from '../../__mocks__/recipes.mock';

const { recipes } = recipesMock;
function setup() {
  const props = {
    recipes,
  };
  const wrapper = shallow(<TopRatedRecipeList {...props} />);

  return {
    wrapper
  };
}

describe('Top Rated Recipes List', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('RecipeCard').length).toBe(recipes.length);
  });
});

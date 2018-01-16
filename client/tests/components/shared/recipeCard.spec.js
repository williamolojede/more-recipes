import React from 'react';
import RecipeCard from '../../../components/shared/RecipeCard/RecipeCard';
import recipesMock from '../../__mocks__/recipes.mock';

function setup() {
  const props = {
    recipe: recipesMock.recipes[0],
  };
  const wrapper = shallow(<RecipeCard {...props} />);

  return {
    wrapper
  };
}

describe('Recipe Card', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

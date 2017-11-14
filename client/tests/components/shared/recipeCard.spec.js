import React from 'react';
import RecipeCard from '../../../components/shared/RecipeCard/RecipeCard';
import recipes from '../../../__mocks__/recipes.mock';

function setup() {
  const props = {
    recipe: recipes[0],
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

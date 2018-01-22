import React from 'react';
import IngredientsList from '../../../components/shared/IngredientsList';
import recipesMock from '../../__mocks__/recipes.mock';

function setup() {
  const props = {
    ingredients: recipesMock.recipes[0].ingredients
  };
  const wrapper = mount(<IngredientsList {...props} />);

  return {
    wrapper
  };
}

describe('Ingredients List', () => {
  it('should render with right amount of elements when number of ingredient is even', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with right amount of elements when number of ingredient is odd', () => {
    const { wrapper } = setup();

    wrapper.setProps({ ingredients: recipesMock.recipes[1].ingredients });
    expect(wrapper).toMatchSnapshot();
  });
});

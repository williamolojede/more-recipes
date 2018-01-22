import React from 'react';
import InstructionsList from '../../../components/shared/InstructionsList';
import recipesMock from '../../__mocks__/recipes.mock';

function setup() {
  const props = {
    instructions: recipesMock.recipes[1].instructions
  };
  const wrapper = mount(<InstructionsList {...props} />);

  return {
    wrapper
  };
}

describe('Instructions List', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

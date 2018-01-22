import React from 'react';
import AddRecipePage from '../../../components/pages/AddRecipePage';

function setup() {
  const wrapper = shallow(<AddRecipePage />);

  return {
    wrapper
  };
}

describe('Add Recipe Page', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

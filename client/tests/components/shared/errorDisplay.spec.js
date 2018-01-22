import React from 'react';
import ErrorDisplay from '../../../components/shared/ErrorDisplay';

function setup() {
  const wrapper = shallow(<ErrorDisplay message="shit went wrong" />);

  return {
    wrapper
  };
}

describe('Error Display', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

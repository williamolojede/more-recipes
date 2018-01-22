import React from 'react';
import Footer from '../../../components/shared/Footer';

function setup() {
  const wrapper = shallow(<Footer />);

  return {
    wrapper
  };
}

describe('Footer', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

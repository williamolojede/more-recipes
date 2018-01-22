import React from 'react';
import NotFound from '../../../components/pages/NotFound.jsx';

describe('Manage Recipes', () => {
  it('should render with right amount of elements', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
  });
});

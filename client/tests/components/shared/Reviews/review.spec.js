import React from 'react';
import Review from '../../../../components/shared/Reviews/Review';
import user from '../../../__mocks__/user.mock';

function setup() {
  const props = {
    review: {
      content: 'Shitty recipe',
      User: user
    }
  };
  const component = shallow(<Review {...props} />);
  return {
    component
  };
}


describe('Notification', () => {
  it('should render with right amount of elements', () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });
});

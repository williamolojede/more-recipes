import React from 'react';
import renderer from 'react-test-renderer';
import Notification from '../../../components/shared/Notification';

function setup() {
  const props = {
    notification: 'you are testing this',
    dispatch: jest.fn()
  };
  const component = renderer.create(<Notification {...props} />);
  return {
    component
  };
}


describe('Notification', () => {
  it('should render with right amount of elements', () => {
    const tree = setup().component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

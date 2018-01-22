import React from 'react';
import Notification from '../../../components/shared/Notification';

jest.useFakeTimers();

function setup(notification = '') {
  const props = {
    notification,
    dispatch: jest.fn()
  };
  const wrapper = shallow(<Notification {...props} />);
  return {
    wrapper
  };
}


describe('Notification', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup('you are testing this');
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with right amount of elements when notifiacation is empty', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should dispatch action to remove notification 3 seconds after rendering', () => {
    const { wrapper } = setup('you are testing this');
    const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
    expect(wrapper.instance().state.timeout).toBe(3000);
    wrapper.setProps({ notification: 'new notification' });

    jest.runAllTimers();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });
});

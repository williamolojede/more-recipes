import React from 'react';
import Notification from '../../../components/shared/Notification';
import notificationMock from '../../__mocks__/notification.mock';

jest.useFakeTimers();

function setup(notification = notificationMock) {
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
    const { wrapper } = setup({ message: 'you are testing this', type: 'success' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with right amount of elements when notifiacation is empty', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should dispatch action to remove notification 5 seconds after rendering', () => {
    const { wrapper } = setup({ message: 'you are testing this', type: 'success' });
    const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
    expect(wrapper.instance().state.timeout).toBe(3000);
    wrapper.setProps({ notification: { message: 'new notification', type: 'success' } });

    jest.runAllTimers();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });
});

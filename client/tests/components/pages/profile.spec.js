import React from 'react';
import { PureProfile, mapStateToProps } from '../../../components/pages/Profile';
import userMock from '../../__mocks__/user.mock';
import notificationMock from '../../__mocks__/notification.mock';

function setup() {
  const props = {
    currentUser: { ...userMock, email: 'test@test.com' },
    isFetching: false,
    dispatch: jest.fn().mockReturnValue(Promise.resolve()),
    notification: notificationMock
  };
  const wrapper = shallow(<PureProfile {...props} />);

  return {
    wrapper
  };
}

describe('Profile', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a preloader', () => {
    const { wrapper } = setup();
    wrapper.setProps({ isFetching: true });
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleOnChange', () => {
    it('should update the state with email', () => {
      const { wrapper } = setup();
      const emailInput = wrapper.find('#email');
      const handleOnChangeSpy = jest.spyOn(wrapper.instance(), 'handleOnChange');
      expect(emailInput.length).toBe(1);
      const event = {
        ...eventObject,
        target: { value: 'wes@htgawm.com' }
      };
      emailInput.simulate('change', event);
      expect(handleOnChangeSpy).toBeCalledWith(event, 'email');
      const { state } = wrapper.instance();
      expect(state.user.email).toBe('wes@htgawm.com');
    });

    it('should update the state with fullname', () => {
      const { wrapper } = setup();
      const fullNameInput = wrapper.find('#fullname');
      const handleOnChangeSpy = jest.spyOn(wrapper.instance(), 'handleOnChange');
      expect(fullNameInput.length).toBe(1);
      const event = {
        ...eventObject,
        target: { value: 'Prof more' }
      };
      fullNameInput.simulate('change', event);
      expect(handleOnChangeSpy).toBeCalledWith(event, 'fullname');
      const { state } = wrapper.instance();
      expect(state.user.fullname).toBe('Prof more');
    });
  });

  describe('handleUpdateProfile', () => {
    it('should dispatch an action to update user profile', () => {
      const { wrapper } = setup();
      const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');

      wrapper.instance().handleUpdateProfile();
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with props required by component from store', () => {
      const store = {
        auth: { currentUser: userMock },
        isFetching: false,
        notification: ''
      };

      const {
        currentUser,
        isFetching,
        notification
      } = mapStateToProps(store);

      expect(currentUser.fullname).toBe(userMock.fullname);
      expect(isFetching).toBe(false);
      expect(notification).toBe('');
    });
  });
});

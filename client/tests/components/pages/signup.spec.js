import React from 'react';
import { PureSignup, mapStateToProps } from '../../../components/pages/Signup';

function setup() {
  const props = {
    dispatch: jest.fn(),
    isFetching: false,
    location: {
      state: {
        from: {}
      }
    },
    isAuthenticated: false
  };
  const wrapper = shallow(<PureSignup {...props} />);

  return {
    wrapper,
    props
  };
}

describe('Signup Page', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should dispatch an action to remove error message of initial mounting', () => {
    const { props } = setup();
    const propsWithErrorMessage = { ...props, errorMessage: 'some thing wrong' };
    const wrapper = shallow(<PureSignup {...propsWithErrorMessage} />);
    const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

  it('should render a preloader', () => {
    const { wrapper } = setup();
    wrapper.setProps({ isFetching: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should redirect to previous page or home if user is already authenticated', () => {
    const { wrapper } = setup();
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper).toMatchSnapshot();
  });

  describe('userSignup', () => {
    it('should dispatch an action to log user in when form is submitted', () => {
      const { wrapper } = setup();
      const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');

      wrapper.instance().userSignup({
        email: 'test@test.com',
        password: '123456',
        fullname: 'john bull'
      });
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with props required by component from store', () => {
      const store = {
        auth: {
          isAuthenticated: false,
          errorMessage: 'something wrong'
        },
        isFetching: false
      };
      expect(mapStateToProps(store).errorMessage).toBe('something wrong');
      expect(mapStateToProps(store).isFetching).toBe(false);
      expect(mapStateToProps(store).isAuthenticated).toBe(false);
    });
  });
});

import React from 'react';
import AuthForm from '../../../components/shared/AuthForm';

function setup() {
  const props = {
    type: 'login',
    authFormSubmit: jest.fn()
  };
  const wrapper = mount(<AuthForm {...props} />);

  return {
    wrapper
  };
}

describe('Nav Dropdown', () => {
  it('should render with right amount of elements for a login form', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with right amount of elements for a signup form', () => {
    const { wrapper } = setup();
    wrapper.setProps({ type: 'signup' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle login submit', () => {
    const { wrapper } = setup();
    const form = wrapper.find('form');
    const onFormSubmitSpy = jest.spyOn(wrapper.instance(), 'onFormSubmit');
    const authFormSubmitSpy = jest.spyOn(wrapper.instance().props, 'authFormSubmit');
    expect(form.length).toBe(1);
    form.simulate('submit', eventObject);
    expect(onFormSubmitSpy).toHaveBeenCalledTimes(1);
    expect(authFormSubmitSpy).toHaveBeenCalledWith({ email: '', password: '' });
  });

  it('should handle signup submit', () => {
    const { wrapper } = setup();
    wrapper.setProps({ type: 'signup' });
    const form = wrapper.find('form');
    const onFormSubmitSpy = jest.spyOn(wrapper.instance(), 'onFormSubmit');
    const authFormSubmitSpy = jest.spyOn(wrapper.instance().props, 'authFormSubmit');
    expect(form.length).toBe(1);
    form.simulate('submit', eventObject);
    expect(onFormSubmitSpy).toHaveBeenCalledTimes(1);
    expect(authFormSubmitSpy).toHaveBeenCalledWith({ email: '', password: '', fullname: '' });
  });
});

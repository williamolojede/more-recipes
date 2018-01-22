import React from 'react';
import { SiteNav } from '../../../components/shared/SiteNav';
import user from '../../__mocks__/user.mock';

function setup() {
  const props = {
    currentUser: user,
    dispatch: jest.fn(),
  };
  const wrapper = shallow(<SiteNav {...props} />);

  return {
    props,
    wrapper
  };
}


describe('Site Nav', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should dispatch an action to log user out when logout method is called', () => {
    const { wrapper } = setup();
    const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
    wrapper.instance().logout(eventObject);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

  it('should render a dropdown when the dropdown button is clicked', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
    const dropdownButton = wrapper.find('.dropdown.right');
    expect(dropdownButton.length).toBe(1);
    dropdownButton.simulate('click');
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.instance().state.navOpen).toBe(true);
  });
});

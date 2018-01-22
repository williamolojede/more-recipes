import React from 'react';
import NavDropDown from '../../../components/shared/NavDropDown';
import userMock from '../../__mocks__/user.mock';

function setup() {
  const props = {
    fullname: userMock.fullname,
    handleLogout: jest.fn()
  };
  const wrapper = shallow(<NavDropDown {...props} />);

  return {
    wrapper
  };
}

describe('Nav Dropdown', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call a function to logout when the logout link is clicked', () => {
    const { wrapper } = setup();
    const logoutButton = wrapper.find('.logout__button');
    const handleLogoutSpy = jest.spyOn(wrapper.instance().props, 'handleLogout');
    expect(logoutButton.length).toBe(1);
    logoutButton.simulate('click');
    expect(handleLogoutSpy).toHaveBeenCalledTimes(1);
  });
});

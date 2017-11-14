import React from 'react';
import { SiteNav } from '../../../components/shared/SiteNav';
import user from '../../../__mocks__/user.mock';

function setup() {
  const props = {
    user,
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
  describe('Logout Button', () => {
    it('should dispatch an action to log user out', () => {
      const { wrapper } = setup();
      const logoutButtons = wrapper.find('.logout__button');
      const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
      logoutButtons.forEach(button => button.simulate('click', eventObject));
      expect(dispatchSpy).toHaveBeenCalledTimes(2);
    });
  });
});

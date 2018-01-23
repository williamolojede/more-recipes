import React from 'react';
import { PureManageRecipes, mapStateToProps } from '../../../components/shared/ManageRecipes';
import userMock from '../../__mocks__/user.mock';
import notifiacationMock from '../../__mocks__/notification.mock';

function setup() {
  const props = {
    dispatch: jest.fn(),
    currentUser: userMock,
    children: (() => (<h1>Yo</h1>))(),
    notification: notifiacationMock
  };
  const wrapper = shallow(<PureManageRecipes {...props} />);

  return {
    wrapper
  };
}

describe('Manage Recipes', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    it('should return an object with props required by component from store', () => {
      const store = {
        auth: {
          currentUser: userMock,
        },
        notification: 'recipe created sucesfully'
      };
      expect(mapStateToProps(store).notification).toBe('recipe created sucesfully');
      expect(mapStateToProps(store).currentUser.fullname).toBe(userMock.fullname);
    });
  });
});

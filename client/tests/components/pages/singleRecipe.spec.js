import React from 'react';
import { PureSingleRecipe, mapStateToProps } from '../../../components/pages/SingleRecipe';
import userMock from '../../__mocks__/user.mock';
import recipesMock from '../../__mocks__/recipes.mock';
import notificationMock from '../../__mocks__/notification.mock';
import { initialState } from '../../../reducers/recipe';

function setup() {
  const props = {
    currentUser: userMock,
    dispatch: jest.fn(),
    recipe: recipesMock.recipes[1],
    match: {
      params: {
        id: '5',
      }
    },
    notification: notificationMock
  };
  const wrapper = shallow(<PureSingleRecipe {...props} />);

  return {
    wrapper
  };
}

describe('Single Recipe Page', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render recipe not found view if there is an error', () => {
    const { wrapper } = setup();
    wrapper.setProps({ errorMessage: 'recipe not found' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a preloader', () => {
    const { wrapper } = setup();
    wrapper.setProps({ recipe: initialState.recipe, isFetching: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should dispatch an action to vote for recipe when the method is called', () => {
    const { wrapper } = setup();
    const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
    wrapper.instance().vote('up');
    // why 2? because dispatch is called also in componentDidMount
    expect(dispatchSpy).toHaveBeenCalledTimes(2);
  });

  it('should dispatch an action to favorite a recipe when the method is called', () => {
    const { wrapper } = setup();
    const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
    wrapper.instance().componentWillUnmount();
    expect(dispatchSpy).toHaveBeenCalledTimes(2);
  });

  it('should dispatch an action to reset the single recipe store when the component is unmounted', () => {
    const { wrapper } = setup();
    const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
    wrapper.instance().favorite();
    expect(dispatchSpy).toHaveBeenCalledTimes(2);
  });

  describe('mapStateToProps', () => {
    it('should return an object with props required by component from store', () => {
      const store = {
        singleRecipe: {
          recipe: recipesMock.recipes[1],
          errorMessage: ''
        },
        auth: { currentUser: userMock },
        isFetching: false,
        notification: ''
      };

      const {
        recipe,
        errorMessage,
        currentUser,
        isFetching,
        notification
      } = mapStateToProps(store);

      expect(recipe.name).toBe(recipesMock.recipes[1].name);
      expect(errorMessage).toBe('');
      expect(currentUser.fullname).toBe(userMock.fullname);
      expect(isFetching).toBe(false);
      expect(notification).toBe('');
    });
  });
});

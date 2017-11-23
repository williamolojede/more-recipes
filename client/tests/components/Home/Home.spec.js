import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../../store';
import { Home } from '../../../components/Home/Home';
import user from '../../../__mocks__/user.mock';
import recipes from '../../../__mocks__/recipes.mock';


function setup() {
  const props = {
    dispatch: jest.fn(),
    isFetching: false,
    user
  };
  const shallowWrapper = shallow(<Home {...props} />);
  const mountedWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Home {...props} />
      </BrowserRouter>
    </Provider>
  );

  return {
    shallowWrapper,
    mountedWrapper,
    props
  };
}

describe('Home', () => {
  it('should render with right amount of elements', () => {
    const { mountedWrapper } = setup();
    expect(mountedWrapper).toMatchSnapshot();
  });
  it('should render top recipes when recipes props is received', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
    shallowWrapper.setProps({
      recipes,
      metaData: {
        pages: [1, 2, 3]
      }
    });
    expect(shallowWrapper).toMatchSnapshot();
    expect(shallowWrapper.instance().state.recipes.length).toBe(6);
    expect(shallowWrapper.instance().state.pages.length).toBe(3);
  });
  it('should render a preloader', () => {
    const { props } = setup();
    const wrapper = shallow(<Home {...{ ...props, ...{ isFetching: true } }} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('getRecipesForPage', () => {
    it('should update currentpage state when called', () => {
      const { shallowWrapper } = setup();
      const getRecipesForPageSpy = jest.spyOn(shallowWrapper.instance(), 'getRecipesForPage');
      shallowWrapper.instance().getRecipesForPage(2);
      expect(shallowWrapper.instance().state.currentPage).toBe(2);
      expect(getRecipesForPageSpy).toHaveBeenCalledTimes(1);
    });
  });
});

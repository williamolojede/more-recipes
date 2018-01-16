import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../../../store';
import { PureHome } from '../../../../components/pages/Home';
import user from '../../../__mocks__/user.mock';
import recipesMock from '../../../__mocks__/recipes.mock';


function setup() {
  const props = {
    dispatch: jest.fn(),
    isFetching: false,
    currentUser: user
  };
  const shallowWrapper = shallow(<PureHome {...props} />);
  const mountedWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <PureHome {...props} />
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
      recipes: recipesMock.recipes,
      pagination: recipesMock.pagination
    });
    expect(shallowWrapper).toMatchSnapshot();
    expect(shallowWrapper.instance().state.recipes.length).toBe(6);
  });

  it('should render a preloader', () => {
    const { props } = setup();
    const wrapper = shallow(<PureHome {...{ ...props, ...{ isFetching: true } }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a search modal when search input is focused', () => {
    const { shallowWrapper } = setup();
    const searchInput = shallowWrapper.find('.site-header__hero--input');

    searchInput.simulate('focus');
    expect(shallowWrapper.instance().state.isSearchActive).toBe(true);
  });

  describe('handlePageClick', () => {
    it('should update currentpage state when called', () => {
      const { shallowWrapper } = setup();
      const handlePageClickSpy = jest.spyOn(shallowWrapper.instance(), 'handlePageClick');
      shallowWrapper.instance().handlePageClick({ selected: 1 });
      expect(shallowWrapper.instance().state.currentPage).toBe(2);
      expect(handlePageClickSpy).toHaveBeenCalledTimes(1);
    });
  });
});

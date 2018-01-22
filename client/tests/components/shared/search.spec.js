import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Search from '../../../components/shared/Search';
import recipesMock from '../../__mocks__/recipes.mock';

jest.useFakeTimers();

function setup() {
  const props = {
    toggleSearch: jest.fn()
  };
  const wrapper = mount(<Router><Search {...props} /></Router>);

  return {
    wrapper
  };
}

describe('Search', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a list of recipe names that match search term', () => {
    const { wrapper } = setup();
    const search = wrapper.find('Search');
    search.instance().setState({ searchResults: recipesMock.recipes });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a list of recipe names that match search term', () => {
    const { wrapper } = setup();
    const search = wrapper.find('Search');
    const searchSpy = jest.spyOn(search.instance(), 'search');
    const textarea = wrapper.find('textarea');
    expect(textarea.length).toBe(1);
    textarea.simulate('change', eventObject);
    jest.runAllTimers();
    expect(searchSpy).toHaveBeenCalledTimes(1);
  });
});

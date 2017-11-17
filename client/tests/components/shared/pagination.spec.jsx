import React from 'react';
import renderer from 'react-test-renderer';
import Pagination from '../../../components/shared/Pagination';

function setup() {
  const props = {
    currentPage: 1,
    pages: [1, 2, 3, 4, 5],
    getRecipesForPage: jest.fn()
  };
  const component = renderer.create(<Pagination {...props} />);
  const wrapper = shallow(<Pagination {...props} />);

  return {
    props,
    component,
    wrapper
  };
}

describe('Pagination', () => {
  it('should render with right amount of elements', () => {
    const tree = setup().component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe('links', () => {
    it('should respond to click event', () => {
      const { wrapper } = setup();
      expect(wrapper).toMatchSnapshot();
      const buttons = wrapper.find('li button');
      const getRecipesForPageSpy = jest.spyOn(wrapper.instance().props, 'getRecipesForPage');
      buttons.forEach(button => button.simulate('click'));
      expect(getRecipesForPageSpy).toHaveBeenCalledTimes(7);
    });
  });

  describe('previous link', () => {
    it('should not be disabled if currentpage is not page 1', () => {
      const { wrapper } = setup();
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ currentPage: 2 });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('next link', () => {
    it('should be diabled if current page is the last', () => {
      const { wrapper } = setup();
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ currentPage: 5 });
      expect(wrapper).toMatchSnapshot();
    });
  });
});

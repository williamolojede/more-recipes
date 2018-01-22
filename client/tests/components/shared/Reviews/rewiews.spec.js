import React from 'react';
import { PureReviews, mapStateToProps } from '../../../../components/shared/Reviews';
import user from '../../../__mocks__/user.mock';
import allReviews from '../../../__mocks__/reviews.mock';

function setup() {
  const props = {
    reviews: allReviews.reviews,
    pagination: allReviews.pagination,
    recipeId: 2,
    currentUser: user,
    dispatch: jest.fn().mockReturnValue(Promise.resolve())
  };

  const wrapper = shallow(<PureReviews {...props} />);

  return {
    wrapper,
    props
  };
}

describe('Reviews Component', () => {
  it('should render with the right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a no-reviews page if there are no reviews', () => {
    const { props } = setup();
    const propsWithEmptyReviews = Object.assign({}, props, { reviews: [] });
    const wrapper = shallow(<PureReviews {...propsWithEmptyReviews} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render pagination links if last page is greater than one', () => {
    const { wrapper } = setup();

    wrapper.setState({ last: 2 });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.instance().state.last).toBe(2);
  });

  it('should update state when component receive reviews and pagination as props', () => {
    const { wrapper } = setup();

    wrapper.setProps({
      reviews: allReviews.reviews,
      pagination: allReviews.pagination
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.instance().props.reviews.length).toBe(allReviews.reviews.length);
  });

  describe('handlePageClick', () => {
    it('should update currentpage state when called', () => {
      const { wrapper } = setup();
      const handlePageClickSpy = jest.spyOn(wrapper.instance(), 'handlePageClick');
      wrapper.instance().handlePageClick({ selected: 1 });
      expect(wrapper.instance().state.currentPage).toBe(2);
      expect(handlePageClickSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with props required by component from store', () => {
      const store = {
        recipeReviews: {
          reviews: allReviews.reviews,
          pagination: allReviews.pagination
        },
        auth: { currentUser: user },
        isFetching: false
      };

      const {
        reviews,
        pagination,
        currentUser,
        isFetching
      } = mapStateToProps(store);

      expect(reviews.length).toBe(allReviews.reviews.length);
      expect(pagination.last).toBe(allReviews.pagination.last);
      expect(currentUser.fullname).toBe(user.fullname);
      expect(isFetching).toBe(false);
    });
  });
});

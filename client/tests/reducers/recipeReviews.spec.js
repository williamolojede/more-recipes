import reducer from '../../reducers/recipeReviews';
import * as types from '../../actions/types';
import reviewsMock from '../__mocks__/reviews.mock';

describe('recipe reviews reducer', () => {
  it('should return the initial state', () => {
    const { reviews, errorMessage, pagination } = reducer(undefined, {});

    expect(reviews.length).toEqual(0);
    expect(pagination.last).toEqual(1);
    expect(errorMessage).toEqual('');
  });

  it('should update the store when reviews are received', () => {
    const { reviews, pagination, errorMessage } = reducer(undefined, {
      type: types.RECEIVE_RECIPE_REVIEWS,
      recipeReviews: {
        reviews: reviewsMock.reviews,
        pagination: reviewsMock.pagination
      }
    });
    expect(reviews.length).toEqual(reviewsMock.reviews.length);
    expect(pagination.last).toEqual(reviewsMock.pagination.last);
    expect(errorMessage).toEqual('');
  });

  it('should update the store when an error message is received', () => {
    const { reviews, errorMessage, pagination } = reducer(undefined, {
      type: types.FETCH_RECIPE_REVIEWS_ERROR,
      errorMessage: 'something bad happened'
    });

    expect(reviews.length).toEqual(0);
    expect(pagination.last).toEqual(1);
    expect(errorMessage).toEqual('something bad happened');
  });
});

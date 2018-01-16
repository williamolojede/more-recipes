import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import * as actions from '../../actions/reviews';
import * as actionTypes from '../../actions/types';

import instance from '../../config/axios';
import reviewsMock from '../__mocks__/reviews.mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const { reviews, pagination } = reviewsMock;

describe('Review Action Creators', () => {
  beforeEach(() => {
    moxios.install(instance);
  });

  afterEach(() => {
    moxios.uninstall(instance);
  });

  it('creates RECEIVE_RECIPE_REVIEWS after successfuly fetching reviews', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: reviewsMock,
      });
    });

    const expectedActions = [
      { type: actionTypes.SET_FETCHING, isFetching: true },
      { type: actionTypes.RECEIVE_RECIPE_REVIEWS, recipeReviews: { reviews, pagination } },
      { type: actionTypes.UNSET_FETCHING, isFetching: false }
    ];

    const store = mockStore({
      recipeReviews: {
        reviews: [],
        pagination: {}
      }
    });

    return store.dispatch(actions.fetchReviews({ recipeId: 2, limit: 6, page: 1 })).then(() => {
      expect(expectedActions.length).toBe(3);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECEIVE_RECIPE_REVIEWS after successfuly posting a review', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: reviewsMock,
      });
    });

    const expectedActions = [
      { type: actionTypes.SET_FETCHING, isFetching: true },
      { type: actionTypes.RECEIVE_RECIPE_REVIEWS, recipeReviews: { reviews, pagination } },
      { type: actionTypes.UNSET_FETCHING, isFetching: false }
    ];

    const store = mockStore({
      recipeReviews: {
        reviews: [],
        pagination: {}
      }
    });

    return store.dispatch(actions.postReview({ content: 'new review', recipeId: 2, limit: 6 })).then(() => {
      expect(expectedActions.length).toBe(3);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_RECIPE_REVIEWS_ERROR if there\'s an error posting a review', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'fail',
          message: 'the content of your review can not be empty'
        },
      });
    });

    const expectedActions = [
      { type: actionTypes.SET_FETCHING, isFetching: true },
      { type: actionTypes.FETCH_RECIPE_REVIEWS_ERROR, errorMessage: 'the content of your review can not be empty' },
      { type: actionTypes.UNSET_FETCHING, isFetching: false }
    ];

    const store = mockStore({
      recipeReviews: {
        reviews: [],
        pagination: {},
        errorMessage: ''
      }
    });

    return store.dispatch(actions.postReview({ content: '', recipeId: 2, limit: 6 })).then(() => {
      expect(expectedActions.length).toBe(3);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_RECIPE_REVIEWS_ERROR if there\'s an error fetching reviews', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          status: 'fail',
          message: 'Recipe not found'
        },
      });
    });

    const expectedActions = [
      { type: actionTypes.SET_FETCHING, isFetching: true },
      { type: actionTypes.FETCH_RECIPE_REVIEWS_ERROR, errorMessage: 'Recipe not found' },
      { type: actionTypes.UNSET_FETCHING, isFetching: false }
    ];

    const store = mockStore({
      recipeReviews: {
        reviews: [],
        pagination: {},
        errorMessage: ''
      }
    });

    return store.dispatch(actions.fetchReviews({ recipeId: 200, limit: 6, page: 1 })).then(() => {
      expect(expectedActions.length).toBe(3);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

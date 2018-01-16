import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import * as actions from '../../actions/recipe';
import * as actionTypes from '../../actions/types';

import instance from '../../config/axios';
import recipesMock from '../__mocks__/recipes.mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const { recipes, pagination } = recipesMock;

describe('Recipe Action Creators', () => {
  beforeEach(() => {
    moxios.install(instance);
  });

  afterEach(() => {
    moxios.uninstall(instance);
  });

  it('creates RECIEVE_SINGLE_RECIPE after successfuly fetching recipe', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          recipe: recipes[0],
          status: 'success'
        },
      });
    });

    const expectedActions = [
      { type: actionTypes.SET_FETCHING, isFetching: true },
      { type: actionTypes.RECIEVE_SINGLE_RECIPE, recipe: recipes[0] },
      { type: actionTypes.UNSET_FETCHING, isFetching: false }
    ];

    const store = mockStore({
      recipe: {},
      errorMessage: ''
    });

    return store.dispatch(actions.fetchSingleRecipe(2)).then(() => {
      expect(expectedActions.length).toBe(3);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_SINGLE_RECIPE_ERROR if there\'s an error fetching recipe', () => {
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
      { type: actionTypes.FETCH_SINGLE_RECIPE_ERROR, errorMessage: 'Recipe not found' },
      { type: actionTypes.UNSET_FETCHING, isFetching: false }
    ];

    const store = mockStore({
      recipe: {},
      errorMessage: ''
    });

    return store.dispatch(actions.fetchSingleRecipe(200)).then(() => {
      expect(expectedActions.length).toBe(3);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECIEVE_SINGLE_RECIPE after successfuly voting on a recipe', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          recipe: recipes[0],
          status: 'success',
          message: 'You liked this recipe'
        },
      });
    });

    const expectedActions = [
      { type: actionTypes.RECIEVE_SINGLE_RECIPE, recipe: recipes[0] },
      { type: actionTypes.SHOW_NOTIFICATION, message: 'You liked this recipe' }
    ];

    const store = mockStore({
      recipe: {},
      errorMessage: ''
    });

    return store.dispatch(actions.vote('up', 2)).then(() => {
      expect(expectedActions.length).toBe(2);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates SHOW_NOTIFICATION if there is an error voting on a recipe', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          status: 'fail',
          message: 'Internal Server error'
        }
      });
    });

    const expectedActions = [
      { type: actionTypes.SHOW_NOTIFICATION, message: 'Internal Server error' }
    ];

    const store = mockStore({
      recipe: {},
      errorMessage: ''
    });

    return store.dispatch(actions.vote('up', 2)).then(() => {
      expect(expectedActions.length).toBe(1);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECIEVE_SINGLE_RECIPE after successfuly favoriting a recipe', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          recipe: recipes[0],
          status: 'success',
          message: 'Recipe added to your favorite list'
        },
      });
    });

    const expectedActions = [
      { type: actionTypes.RECIEVE_SINGLE_RECIPE, recipe: recipes[0] },
      { type: actionTypes.SHOW_NOTIFICATION, message: 'Recipe added to your favorite list' }
    ];

    const store = mockStore({
      recipe: {},
      errorMessage: ''
    });

    return store.dispatch(actions.favorite('up', 2)).then(() => {
      expect(expectedActions.length).toBe(2);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates SHOW_NOTIFICATION if there is an error favoriting on a recipe', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 403,
        response: {
          status: 'fail',
          message: 'You are not allowed to perform this action on your own recipe'
        },
      });
    });

    const expectedActions = [
      { type: actionTypes.SHOW_NOTIFICATION, message: 'You are not allowed to perform this action on your own recipe' }
    ];

    const store = mockStore({
      recipe: {},
      errorMessage: ''
    });

    return store.dispatch(actions.favorite('up', 2)).then(() => {
      expect(expectedActions.length).toBe(1);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECIEVE_TOP_RATED_RECIPE after successfuly fetching all top recipes', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          recipes,
          pagination,
          status: 'success',
        },
      });
    });

    const expectedActions = [
      { type: actionTypes.SET_FETCHING, isFetching: true },
      { type: actionTypes.RECIEVE_TOP_RATED_RECIPE, recipes, pagination },
      { type: actionTypes.UNSET_FETCHING, isFetching: false }
    ];

    const store = mockStore({
      topRecipes: {}
    });

    return store.dispatch(actions.fetchTopRecipes(1, 6)).then(() => {
      expect(expectedActions.length).toBe(3);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_TOP_RECIPES_ERROR if tere is an error fetching top recipes', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          status: 'fail',
          message: 'Internal Server error'
        },
      });
    });

    const expectedActions = [
      { type: actionTypes.SET_FETCHING, isFetching: true },
      { type: actionTypes.FETCH_TOP_RECIPES_ERROR, errorMessage: 'Internal Server error' },
      { type: actionTypes.UNSET_FETCHING, isFetching: false }
    ];

    const store = mockStore({
      topRecipes: {}
    });

    return store.dispatch(actions.fetchTopRecipes(1, 6)).then(() => {
      expect(expectedActions.length).toBe(3);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

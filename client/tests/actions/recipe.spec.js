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

const showNotification = (message, type) => ({
  type: actionTypes.SHOW_NOTIFICATION,
  payload: {
    message,
    type
  }
});

describe('Recipe Action Creators', () => {
  beforeEach(() => {
    moxios.install(instance);
  });

  afterEach(() => {
    moxios.uninstall(instance);
  });

  it('creates RECEIVE_SINGLE_RECIPE after successfuly fetching recipe', () => {
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
      { type: actionTypes.RECEIVE_SINGLE_RECIPE, recipe: recipes[0] },
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

  it('creates RECEIVE_SINGLE_RECIPE after successfuly voting on a recipe', () => {
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
      { type: actionTypes.RECEIVE_SINGLE_RECIPE, recipe: recipes[0] },
      showNotification('You liked this recipe', 'success')
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
      showNotification('Internal Server error', 'error')
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

  it('creates RECEIVE_SINGLE_RECIPE after successfuly favoriting a recipe', () => {
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
      { type: actionTypes.RECEIVE_SINGLE_RECIPE, recipe: recipes[0] },
      showNotification('Recipe added to your favorite list', 'success')
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
      showNotification('You are not allowed to perform this action on your own recipe', 'error')
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

  it('creates RECEIVE_TOP_RATED_RECIPES after successfuly fetching all top recipes', () => {
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
      { type: actionTypes.RECEIVE_TOP_RATED_RECIPES, recipes, pagination },
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

  it('creates RECEIVE_PERSONAL_RECIPES after successfuly fetching users recipes', () => {
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
      { type: actionTypes.RECEIVE_PERSONAL_RECIPES, recipes, pagination },
      { type: actionTypes.UNSET_FETCHING, isFetching: false }
    ];

    const store = mockStore({
      personalRecipes: {}
    });

    return store.dispatch(actions.fetchPersonalRecipes({
      userId: 8,
      page: 1,
      limit: 5
    })).then(() => {
      expect(expectedActions.length).toBe(3);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_PERSONAL_RECIPES_ERROR if tere is an error fetching top recipes', () => {
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
      { type: actionTypes.FETCH_PERSONAL_RECIPES_ERROR, errorMessage: 'Internal Server error' },
      { type: actionTypes.UNSET_FETCHING, isFetching: false }
    ];

    const store = mockStore({
      personalRecipes: {}
    });

    return store.dispatch(actions.fetchPersonalRecipes({
      userId: 8,
      page: 1,
      limit: 5
    })).then(() => {
      expect(expectedActions.length).toBe(3);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECEIVE_FAVORITE_RECIPES after successfuly fetching users favorite recipes', () => {
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
      { type: actionTypes.RECEIVE_FAVORITE_RECIPES, recipes, pagination },
      { type: actionTypes.UNSET_FETCHING, isFetching: false }
    ];

    const store = mockStore({
      favoriteRecipes: {}
    });

    return store.dispatch(actions.fetchFavoriteRecipes({
      userId: 8,
      page: 1,
      limit: 5
    })).then(() => {
      expect(expectedActions.length).toBe(3);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_FAVORITE_RECIPES_ERROR if there is an error fetching top recipes', () => {
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
      { type: actionTypes.FETCH_FAVORITE_RECIPES_ERROR, errorMessage: 'Internal Server error' },
      { type: actionTypes.UNSET_FETCHING, isFetching: false }
    ];

    const store = mockStore({
      personalRecipes: {}
    });

    return store.dispatch(actions.fetchFavoriteRecipes({
      userId: 8,
      page: 1,
      limit: 5
    })).then(() => {
      expect(expectedActions.length).toBe(3);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches an action to show success notification when recipe is created', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          recipe: recipesMock.recipes[1],
          message: 'recipe created successfully',
          status: 'success'
        },
      });
    });

    const expectedActions = [
      showNotification('recipe created successfully', 'success')
    ];

    const store = mockStore({
      recipe: {}
    });

    return store.dispatch(actions.addRecipe(recipesMock.recipes[1]))
      .then(() => {
        expect(expectedActions.length).toBe(1);
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatches an action to show error notification when there is an error creating recipe', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          message: 'Recipe description is required',
          status: 'fail'
        },
      });
    });

    const expectedActions = [
      showNotification('Recipe description is required', 'error')
    ];

    const store = mockStore({
      recipes: {}
    });

    return store.dispatch(actions.addRecipe({ name: 'some recipe' }))
      .then(() => {}, () => {
        expect(expectedActions.length).toBe(1);
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatches an action to show success notification when recipe is deleted', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          message: 'Recipe deleted successfully'
        },
      });
    });

    const expectedActions = [
      { type: actionTypes.SET_FETCHING, isFetching: true },
      showNotification('Recipe deleted successfully', 'success'),
      { type: actionTypes.UNSET_FETCHING, isFetching: false }
    ];

    const store = mockStore({
      recipe: {}
    });

    return store.dispatch(actions.deleteRecipe(195))
      .then(() => {
        expect(expectedActions.length).toBe(3);
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatches an action to show error notification when there is an error deleting recipe', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 403,
        response: {
          message: 'Not authorized to delete this recipe',
          status: 'fail'
        },
      });
    });

    const expectedActions = [
      { type: actionTypes.SET_FETCHING, isFetching: true },
      showNotification('Not authorized to delete this recipe', 'error'),
      { type: actionTypes.UNSET_FETCHING, isFetching: false }
    ];

    const store = mockStore({
      recipes: {}
    });

    return store.dispatch(actions.deleteRecipe(200))
      .then(() => {
        expect(expectedActions.length).toBe(3);
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatches an action to show success notification when recipe is updated', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          message: 'Recipe updated successfully',
          recipe: recipesMock.recipes[1]
        },
      });
    });

    const expectedActions = [
      showNotification('Recipe updated successfully', 'success')
    ];

    const store = mockStore({
      recipe: {}
    });

    return store.dispatch(actions.updateRecipe(195))
      .then(() => {
        expect(expectedActions.length).toBe(1);
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatches an action to show error notification when there is an error updating recipe', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          message: 'Internal server error',
          status: 'fail'
        },
      });
    });

    const expectedActions = [
      showNotification('Internal server error', 'error')
    ];

    const store = mockStore({
      recipes: {}
    });

    return store.dispatch(actions.updateRecipe(195))
      .then(() => {}, () => {
        expect(expectedActions.length).toBe(1);
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import * as actions from '../../actions/userProfile';
import * as actionTypes from '../../actions/types';

import instance from '../../config/axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const user = {
  id: 8,
  username: null,
  email: 'johnbull@andela.com',
  fullname: 'William Olojede',
  imgUrl: 'https://firebasestorage.googleapis.com/v0/b/more-recipes.appspot.com/o/users%2F8--1516447591647?alt=media&token=4aa88f7e-b942-4341-b791-68da2c6fbb4a',
  createdAt: '2017-11-01T04:58:04.737Z',
  updatedAt: '2018-01-20T13:33:27.202Z'
};

describe('User Profile Action Creators', () => {
  beforeEach(() => {
    moxios.install(instance);
  });

  afterEach(() => {
    moxios.uninstall(instance);
  });

  it('creates RECEIVE_CURRENT_USER after successfuly fetching user details', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          message: 'user found',
          user,
          asOwner: true
        },
      });
    });

    const expectedActions = [
      { type: actionTypes.SET_FETCHING, isFetching: true },
      { type: actionTypes.RECEIVE_CURRENT_USER, user },
      { type: actionTypes.UNSET_FETCHING, isFetching: false }
    ];

    const store = mockStore({
      auth: {
        currentUser: {
          id: 0,
          fullname: ''
        }
      }
    });

    return store.dispatch(actions.fetchUserProfile(8)).then(() => {
      expect(expectedActions.length).toBe(3);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECEIVE_CURRENT_USER after succesfully updating user profile', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          message: 'User Details updated successfully',
          user
        },
      });
    });

    const expectedActions = [
      { type: actionTypes.RECEIVE_CURRENT_USER, user },
      {
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          message: 'User Details updated successfully',
          type: 'success'
        }
      }
    ];

    const store = mockStore({
      auth: {
        currentUser: {
          id: 0,
          fullname: ''
        }
      }
    });

    return store.dispatch(actions.updateUserProfile(user)).then(() => {
      expect(expectedActions.length).toBe(2);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should show notification when theres an error updating user profile', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 409,
        response: {
          message: 'User with email already exists',
          status: 'fail'
        },
      });
    });

    const expectedActions = [
      {
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          message: 'User with email already exists',
          type: 'error'
        }
      }
    ];

    const store = mockStore({
      auth: {
        currentUser: {
          id: 0,
          fullname: ''
        }
      }
    });

    return store.dispatch(actions.updateUserProfile(user)).then(() => {
      expect(expectedActions.length).toBe(1);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECEIVE_CURRENT_USER_ERROR if there\'s an error posting a review', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          status: 'fail',
          message: 'Internal server error'
        },
      });
    });

    const expectedActions = [
      { type: actionTypes.SET_FETCHING, isFetching: true },
      { type: actionTypes.RECEIVE_CURRENT_USER_ERROR, errorMessage: 'Internal server error' },
      { type: actionTypes.UNSET_FETCHING, isFetching: false }
    ];

    const store = mockStore({
      auth: {
        currentUser: {
          id: 0,
          fullname: ''
        }
      }
    });

    return store.dispatch(actions.fetchUserProfile(8)).then(() => {
      expect(expectedActions.length).toBe(3);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

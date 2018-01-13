import { batchActions } from 'redux-batched-actions';

import instance from '../config/axios';

import { setFetching, unsetFetching } from './fetching';

import {
  RECEIVE_RECIPE_REVIEWS,
} from './types';

const receiveRecipeReviews = (type, reviews) => ({
  type,
  reviews
});

export const fetchReviews = id => (dispatch) => {
  dispatch(setFetching());
  return instance.get(`/recipes/${id}/reviews`)
    .then((res) => {
      dispatch(batchActions([
        receiveRecipeReviews(RECEIVE_RECIPE_REVIEWS, res.data.reviews),
        unsetFetching()
      ]));
    })
    .catch((err) => {
      console.log(err.message || err.response.data.message);
      dispatch(unsetFetching());
    });
};


export const postReview = (content, id) => (dispatch) => {
  dispatch(setFetching());
  return instance.post(`/recipes/${id}/reviews`, { content })
    .then((res) => {
      dispatch(batchActions([
        receiveRecipeReviews(RECEIVE_RECIPE_REVIEWS, res.data.reviews),
        unsetFetching()
      ]));
    })
    .catch((err) => {
      console.log(err.response.data.message || err.message);
      dispatch(unsetFetching());
    });
};

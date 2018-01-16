import instance from '../config/axios';

import { setFetching, unsetFetching } from './fetching';

import {
  RECEIVE_RECIPE_REVIEWS,
  FETCH_RECIPE_REVIEWS_ERROR
} from './types';

const receiveRecipeReviews = (type, recipeReviews) => ({
  type,
  recipeReviews
});

const receiveRecipeReviewsError = errorMessage => ({
  type: FETCH_RECIPE_REVIEWS_ERROR,
  errorMessage
});

const handleSuccess = (dispatch, res) => {
  dispatch(receiveRecipeReviews(RECEIVE_RECIPE_REVIEWS, {
    reviews: res.data.reviews,
    pagination: res.data.pagination
  }));
  dispatch(unsetFetching());
};

const handleFailure = (dispatch, err) => {
  dispatch(receiveRecipeReviewsError(err.response.data.message));
  dispatch(unsetFetching());
};

export const fetchReviews = ({ recipeId, limit, page }) => (dispatch) => {
  dispatch(setFetching());
  return instance.get(`/recipes/${recipeId}/reviews?page=${page}&limit=${limit}`)
    .then(res => handleSuccess(dispatch, res))
    .catch(err => handleFailure(dispatch, err));
};

/**
 *
 * @param {String} content - review message
 * @param {Number} recipeId - recipe id
 * @param {Number} limit - pagination limit
 * @return {Promise} -
 */
export const postReview = ({ content, recipeId, limit }) => (dispatch) => {
  dispatch(setFetching());
  return instance.post(`/recipes/${recipeId}/reviews?page=1&limit=${limit}`, { content })
    .then(res => handleSuccess(dispatch, res))
    .catch(err => handleFailure(dispatch, err));
};

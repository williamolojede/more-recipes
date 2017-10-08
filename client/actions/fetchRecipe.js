import { batchActions } from 'redux-batched-actions';

import instance from '../config/axios';

import { setFetching, unsetFetching } from './fetching';
import { RECIEVE_TOP_RATED_RECIPE, RECIEVE_SINGLE_RECIPE } from './types';

const recieveTopRecipes = recipes => ({
  type: RECIEVE_TOP_RATED_RECIPE,
  recipes
});

const recieveSingleRecipe = recipe => ({
  type: RECIEVE_SINGLE_RECIPE,
  recipe
});

export const fetchSingleRecipes = id => (dispatch) => {
  dispatch(setFetching());
  return instance.get(`/recipes/${id}`)
    .then((res) => {
      dispatch(
        batchActions([
          recieveSingleRecipe(res.data.recipe),
          unsetFetching()
        ])
      );
    })
    .catch((err) => {
      console.log(err.message || err.response.data.message);
      dispatch(unsetFetching());
    });
};

export const fetchTopRecipes = () => (dispatch) => {
  dispatch(setFetching());
  return instance.get('/recipes?sort=upvotes&order=descending')
    .then((res) => {
      dispatch(
        batchActions([
          recieveTopRecipes(res.data.recipes),
          unsetFetching()
        ])
      );
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
      dispatch(
        batchActions([
          recieveSingleRecipe(res.data.recipe),
          unsetFetching()
        ])
      );
    })
    .catch((err) => {
      console.log(err.response.data.message || err.message);
      dispatch(unsetFetching());
    });
};

export const vote = (dir, id) => (dispatch) => {
  dispatch(setFetching());
  return instance.post(`/recipes/${id}/vote-${dir}`)
    .then((res) => {
      dispatch(
        batchActions([
          recieveSingleRecipe(res.data.recipe),
          unsetFetching()
        ])
      );
    })
    .catch((err) => {
      console.log(err.response.data.message || err.message);
      dispatch(unsetFetching());
    });
};

export const favorite = id => (dispatch) => {
  dispatch(setFetching());
  return instance.post(`/recipes/${id}/favorite`)
    .then((res) => {
      dispatch(
        batchActions([
          recieveSingleRecipe(res.data.recipe),
          unsetFetching()
        ])
      );
    })
    .catch((err) => {
      console.log(err.response.data.message || err.message);
      dispatch(unsetFetching());
    });
};

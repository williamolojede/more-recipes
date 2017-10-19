import { batchActions } from 'redux-batched-actions';

import instance from '../config/axios';

import { setFetching, unsetFetching } from './fetching';
import {
  RECIEVE_TOP_RATED_RECIPE,
  RECIEVE_SINGLE_RECIPE,
  RECIEVE_NEW_RECIPE,
  RECIEVE_UPDATED_RECIPE
} from './types';

const recieveTopRecipes = recipes => ({
  type: RECIEVE_TOP_RATED_RECIPE,
  recipes
});

const recieveSingleRecipe = recipe => ({
  type: RECIEVE_SINGLE_RECIPE,
  recipe
});

const recieveNewRecipe = recipe => ({
  type: RECIEVE_NEW_RECIPE,
  recipe
});

const recieveUpdatedRecipe = (recipe, index) => ({
  type: RECIEVE_UPDATED_RECIPE,
  recipe,
  index
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

export const addRecipe = recipe => (dispatch) => {
  dispatch(setFetching());
  return instance.post('/recipes', { recipe })
    .then((res) => {
      dispatch(
        batchActions([
          recieveNewRecipe(res.data.recipe),
          unsetFetching()
        ])
      );
    })
    .catch((err) => {
      console.log(err.response.data.message || err.message);
      dispatch(unsetFetching());
    });
};

export const updateRecipe = (recipe, index) => (dispatch) => {
  const { id, name, description, img_url, ingredients, instructions } = recipe;
  const update = { name, description, img_url, ingredients, instructions };

  dispatch(setFetching());
  return instance.put(`/recipes/${id}`, { update })
    .then((res) => {
      dispatch(
        batchActions([
          recieveUpdatedRecipe(res.data.recipe, index),
          unsetFetching()
        ])
      );
    })
    .catch((err) => {
      console.log(err.message || err.response.data.message);
      dispatch(unsetFetching());
    });
};

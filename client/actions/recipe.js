import { batchActions } from 'redux-batched-actions';

import instance from '../config/axios';

import { setFetching, unsetFetching } from './fetching';
import { showNotification } from './notification';

import {
  RECIEVE_TOP_RATED_RECIPE,
  RECIEVE_SINGLE_RECIPE,
  RECIEVE_NEW_RECIPE,
  RECIEVE_UPDATED_RECIPE,
  FETCH_SINGLE_RECIPE_ERROR,
  RESET_SINGLE_RECIPE,
  FETCH_TOP_RECIPES_ERROR
} from './types';

const recieveTopRecipes = (recipes, pagination) => ({
  type: RECIEVE_TOP_RATED_RECIPE,
  recipes,
  pagination
});

const recieveSingleRecipe = (type, recipe) => ({
  type,
  recipe
});


const recieveUpdatedRecipe = (recipe, index) => ({
  type: RECIEVE_UPDATED_RECIPE,
  recipe,
  index
});

export const resetSingleRecipe = () => ({
  type: RESET_SINGLE_RECIPE
});

export const fetchSingleRecipe = id => (dispatch) => {
  dispatch(setFetching());
  return instance.get(`/recipes/${id}`)
    .then((res) => {
      dispatch(recieveSingleRecipe(RECIEVE_SINGLE_RECIPE, res.data.recipe));
      dispatch(unsetFetching());
    })
    .catch((err) => {
      dispatch({ type: FETCH_SINGLE_RECIPE_ERROR, errorMessage: err.response.data.message });
      dispatch(unsetFetching());
    });
};

export const fetchTopRecipes = (page, limit) => (dispatch) => {
  dispatch(setFetching());
  return instance.get(`/recipes?sort=upvotes&order=descending&page=${page}&limit=${limit}`)
    .then((res) => {
      dispatch(recieveTopRecipes(res.data.recipes, res.data.pagination));
      dispatch(unsetFetching());
    })
    .catch((err) => {
      dispatch({
        type: FETCH_TOP_RECIPES_ERROR,
        errorMessage: err.response.data.message
      });
      dispatch(unsetFetching());
    });
};

export const vote = (dir, id) => dispatch => instance.post(`/recipes/${id}/vote-${dir}`)
  .then((res) => {
    dispatch(recieveSingleRecipe(RECIEVE_SINGLE_RECIPE, res.data.recipe));
    dispatch(showNotification(res.data.message));
  })
  .catch((err) => {
    dispatch(showNotification(err.response.data.message));
  });


export const favorite = id => dispatch => instance.post(`/recipes/${id}/favorite`)
  .then((res) => {
    dispatch(recieveSingleRecipe(RECIEVE_SINGLE_RECIPE, res.data.recipe));
    dispatch(showNotification(res.data.message));
  })
  .catch((err) => {
    dispatch(showNotification(err.response.data.message));
  });

export const addRecipe = recipe => dispatch =>
  instance.post('/recipes', { recipe })
    .then((res) => {
      dispatch(batchActions([
        recieveSingleRecipe(RECIEVE_NEW_RECIPE, res.data.recipe),
        showNotification(res.data.message),
      ]));
    })
    .catch((err) => {
      dispatch(showNotification(err.response.data.message));
    });

export const updateRecipe = (recipe, index) => (dispatch) => {
  const {
    id,
    name,
    description,
    img_url,
    ingredients,
    instructions
  } = recipe;
  const update = {
    name,
    description,
    img_url,
    ingredients,
    instructions
  };

  dispatch(setFetching());
  return instance.put(`/recipes/${id}`, { update })
    .then((res) => {
      dispatch(batchActions([
        recieveUpdatedRecipe(res.data.recipe, index),
        unsetFetching()
      ]));
    })
    .catch((err) => {
      console.log(err.message || err.response.data.message);
      dispatch(unsetFetching());
    });
};

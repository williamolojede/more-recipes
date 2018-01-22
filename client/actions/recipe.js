import instance from '../config/axios';

import { setFetching, unsetFetching } from './fetching';
import { showNotification } from './notification';

import * as actionTypes from './types';

const receiveRecipes = (type, res) => ({
  type,
  recipes: res.data.recipes,
  pagination: res.data.pagination
});

const recieveSingleRecipe = (type, recipe) => ({
  type,
  recipe
});

const fetchRecipesError = (err, dispatch, type) => {
  dispatch({
    type,
    errorMessage: err.response.data.message
  });
  dispatch(unsetFetching());
};


export const resetSingleRecipe = () => ({
  type: actionTypes.RESET_SINGLE_RECIPE
});

export const fetchSingleRecipe = id => (dispatch) => {
  dispatch(setFetching());
  return instance.get(`/recipes/${id}`)
    .then((res) => {
      dispatch(recieveSingleRecipe(actionTypes.RECEIVE_SINGLE_RECIPE, res.data.recipe));
      dispatch(unsetFetching());
    })
    .catch(err => fetchRecipesError(err, dispatch, actionTypes.FETCH_SINGLE_RECIPE_ERROR));
};

export const fetchPersonalRecipes = ({ userId, page, limit }) => (dispatch) => {
  dispatch(setFetching());
  return instance.get(`/users/${userId}/recipes?page=${page}&limit=${limit}`)
    .then((res) => {
      dispatch(receiveRecipes(actionTypes.RECEIVE_PERSONAL_RECIPES, res));
      dispatch(unsetFetching());
    })
    .catch(err => fetchRecipesError(err, dispatch, actionTypes.FETCH_PERSONAL_RECIPES_ERROR));
};

export const fetchFavoriteRecipes = ({ userId, page, limit }) => (dispatch) => {
  dispatch(setFetching());
  return instance.get(`/users/${userId}/favorites?page=${page}&limit=${limit}`)
    .then((res) => {
      dispatch(receiveRecipes(actionTypes.RECEIVE_FAVORITE_RECIPES, res));
      dispatch(unsetFetching());
    })
    .catch(err => fetchRecipesError(err, dispatch, actionTypes.FETCH_FAVORITE_RECIPES_ERROR));
};

export const fetchTopRecipes = (page, limit) => (dispatch) => {
  dispatch(setFetching());
  return instance.get(`/recipes?sort=upvotes&order=descending&page=${page}&limit=${limit}`)
    .then((res) => {
      dispatch(receiveRecipes(actionTypes.RECEIVE_TOP_RATED_RECIPES, res));
      dispatch(unsetFetching());
    })
    .catch(err => fetchRecipesError(err, dispatch, actionTypes.FETCH_TOP_RECIPES_ERROR));
};

export const vote = (dir, id) => dispatch => instance.post(`/recipes/${id}/vote-${dir}`)
  .then((res) => {
    dispatch(recieveSingleRecipe(actionTypes.RECEIVE_SINGLE_RECIPE, res.data.recipe));
    dispatch(showNotification(res.data.message));
  })
  .catch((err) => {
    dispatch(showNotification(err.response.data.message));
  });


export const favorite = id => dispatch => instance.post(`/recipes/${id}/favorite`)
  .then((res) => {
    dispatch(recieveSingleRecipe(actionTypes.RECEIVE_SINGLE_RECIPE, res.data.recipe));
    dispatch(showNotification(res.data.message));

    // Return true to confirm delete
    // occurred used in favorite recipe page
    return true;
  })
  .catch((err) => {
    dispatch(showNotification(err.response.data.message));
  });

export const addRecipe = recipe => dispatch =>
  instance.post('/recipes', { recipe })
    .then((res) => {
      dispatch(showNotification(res.data.message));
    })
    .catch((err) => {
      dispatch(showNotification(err.response.data.message));
    });

export const updateRecipe = recipe => (dispatch) => {
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
  return instance.put(`/recipes/${id}`, { update })
    .then((res) => {
      dispatch(showNotification(res.data.message));
    })
    .catch((err) => {
      dispatch(showNotification(err.response.data.message));
    });
};

export const deleteRecipe = id => (dispatch) => {
  dispatch(setFetching());
  return instance.delete(`recipes/${id}`)
    .then((res) => {
      dispatch(showNotification(res.data.message));
      dispatch(unsetFetching());

      // Return true to confirm delete
      // occurred used in personal recipe page
      return true;
    })
    .catch((err) => {
      dispatch(showNotification(err.response.data.message));
      dispatch(unsetFetching());
    });
};

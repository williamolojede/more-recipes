import { batchActions } from 'redux-batched-actions';

import instance from '../config/axios';

import { setFetching, unsetFetching } from './fetching';
import { RECIEVE_TOP_RATED_RECIPE } from './types';

const recieveTopRecipes = recipes => ({
  type: RECIEVE_TOP_RATED_RECIPE,
  recipes
});

const fetchTopRecipes = () => (dispatch) => {
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

export default fetchTopRecipes;

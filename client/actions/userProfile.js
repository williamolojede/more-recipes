import { batchActions } from 'redux-batched-actions';

import instance from '../config/axios';

import { setFetching, unsetFetching } from './fetching';
import { REMOVE_RECIPE_FROM_PROFILE } from './types';


const receiveUserProfile = (data, type) => ({
  type,
  data,
});


export const removeRecipeFromUserProfile = (index, from) => ({
  type: REMOVE_RECIPE_FROM_PROFILE,
  index,
  from,
});

const fetchUserProfile = (id, type) => (dispatch) => {
  dispatch(setFetching());
  instance.get(`/users/${id}`)
    .then((res) => {
      dispatch(batchActions([
        receiveUserProfile({ user: res.data.user, asOwner: res.data.asOwner }, type),
        unsetFetching()
      ]));
    })
    .catch((err) => {
      console.log(err.message || err.response.data.message);
      dispatch(unsetFetching());
    });
};
export const deletePersonalRecipe = (id, index) => (dispatch) => {
  dispatch(setFetching());
  instance.delete(`recipes/${id}`)
    .then(() => {
      dispatch(batchActions([
        removeRecipeFromUserProfile(index, 'recipes'),
        unsetFetching()
      ]));
    })
    .catch((err) => {
      console.log(err.message || err.response.data.message);
      dispatch(unsetFetching());
    });
};

export default fetchUserProfile;

import {
  RECIEVE_USER_PROFILE,
  RECIEVE_NEW_RECIPE,
  REMOVE_RECIPE_FROM_PROFILE,
  RECIEVE_UPDATED_RECIPE
} from '../actions/types';

const userProfile = (state = {}, action) => {
  const oldState = Object.assign({}, state);
  let user;
  switch (action.type) {
    case RECIEVE_USER_PROFILE:
      return action.data;
    case RECIEVE_NEW_RECIPE:
      oldState.recipes = oldState.recipes.concat(action.recipe);
      return oldState;
    case REMOVE_RECIPE_FROM_PROFILE:
      user = Object.assign({}, oldState.user);
      user[action.from] = [
        ...user[action.from].slice(0, action.index),
        ...user[action.from].slice(action.index + 1)
      ];
      oldState.user = user;
      return oldState;
    case RECIEVE_UPDATED_RECIPE: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.user.recipes[action.index] = action.recipe;
      return newState;
    }
    default:
      return state;
  }
};

export default userProfile;

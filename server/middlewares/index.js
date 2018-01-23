import countViews from './countViews';
import validateRecipeId from './validateRecipeId';
import validateUserId from './validateUserId';
import requiresToken from './requiresToken';
import validateAddRecipe from './validateAddRecipe';
import countVotes from './countVotes';
import countFavorites from './countFavorites';
import restrictOwnerActions from './restrictOwnerActions';
import validateLogin from './validateLogin';
import validateSignup from './validateSignup';
import validateUpdate from './validateUpdate';
import validateExistingRecipeName from './validateExistingRecipeName';
import isOwner from './isOwner';

const middlewares = {
  countViews,
  validateRecipeId,
  validateUserId,
  requiresToken,
  validateAddRecipe,
  countVotes,
  countFavorites,
  restrictOwnerActions,
  validateLogin,
  validateSignup,
  validateUpdate,
  validateExistingRecipeName,
  isOwner
};

export default middlewares;

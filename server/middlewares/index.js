import countViews from './countViews';
import validateRecipeId from './validateRecipeId';
import validateUserId from './validateUserId';
import requiresToken from './requiresToken';
import validateAddRecipe from './validateAddRecipe';
import countVotes from './countVotes';
import countFavorites from './countFavorites';
import ownerNotAllowed from './ownerNotAllowed';
import validateLogin from './validateLogin';
import validateSignup from './validateSignup';

const middlewares = {
  countViews,
  validateRecipeId,
  validateUserId,
  requiresToken,
  validateAddRecipe,
  countVotes,
  countFavorites,
  ownerNotAllowed,
  validateLogin,
  validateSignup
};

export default middlewares;

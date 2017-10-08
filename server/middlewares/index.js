import countViews from './countViews';
import doesRecipeExist from './doesRecipeExist';
import doesUserExist from './doesUserExist';
import requiresToken from './requiresToken';
import validateAddRecipe from './validateAddRecipe';
import countVotes from './countVotes';
import countFavorites from './countFavorites';
import ownerNotAllowed from './ownerNotAllowed';
import validateLogin from './validateLogin';
import validateSignup from './validateSignup';

const middlewares = {
  countViews,
  doesRecipeExist,
  doesUserExist,
  requiresToken,
  validateAddRecipe,
  countVotes,
  countFavorites,
  ownerNotAllowed,
  validateLogin,
  validateSignup
};

export default middlewares;

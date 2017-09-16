import countViews from './countViews';
import doesRecipeExist from './doesRecipeExist';
import requiresToken from './requiresToken';
import validateAddRecipe from './validateAddRecipe';
import countVotes from './countVotes';
import countFavorites from './countFavorites';
import ownerNotAllowed from './ownerNotAllowed';

const middlewares = {
  countViews,
  doesRecipeExist,
  requiresToken,
  validateAddRecipe,
  countVotes,
  countFavorites,
  ownerNotAllowed
};

export default middlewares;

import { Recipe } from '../models';
import systemErrorHandler from '../helpers/systemErrorHandler';
import validateIdParam from '../helpers/validateIdParam';

const validateRecipeId = (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id) || /[a-zA-Z]+$/.test(req.params.id) || req.params.id < 0) {
    return validateIdParam({ type: 'invalid-param-value', value: req.params.id }, 'Recipe', next);
  }

  Recipe.findById(req.params.id)
    .then((recipe) => {
      validateIdParam({ type: 'not-found', value: recipe }, 'Recipe', next);
      req.recipeOwner = recipe.owner;
      // so i can get access to the recipe id thats has
      // been converted to number in subsequent middlewares
      req.recipeId = id;
      return next();
    })
    .catch(error => systemErrorHandler(error, next));
};

export default validateRecipeId;

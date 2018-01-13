import { Recipe } from '../models';
import systemErrorHandler from '../helpers/systemErrorHandler';
import validateIdParam from '../helpers/validateIdParam';

const validateRecipeId = (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id) || id < 0) {
    return validateIdParam({ type: 'invalid-param-value', value: req.params.id }, 'Recipe', next);
  }

  Recipe.findById(req.params.id)
    .then((recipe) => {
      validateIdParam({ type: 'not-found', value: recipe }, 'Recipe', next);
      req.recipeOwner = recipe.owner;
      return next();
    })
    .catch(error => systemErrorHandler(error, next));
};

export default validateRecipeId;

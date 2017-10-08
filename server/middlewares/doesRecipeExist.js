import { Recipe } from '../models';
import systemErrorHandler from '../helpers/systemErrorHandler';
import itemDoesNotExist from '../helpers/itemDoesNotExist';

const doesRecipeExist = (req, res, next) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      itemDoesNotExist(recipe, 'Recipe', next);
      req.recipeOwner = recipe.owner;
      return next();
    })
    .catch(error => systemErrorHandler(error, next));
};

export default doesRecipeExist;

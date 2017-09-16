import { Recipe } from '../models';
import systemErrorHandler from '../helpers/systemErrorHandler';

const doesRecipeExist = (req, res, next) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      if (!recipe) {
        const err = new Error('Recipe not found');
        err.status = 404;
        return next(err);
      }
      req.recipeOwner = recipe.owner;
      return next();
    })
    .catch(error => systemErrorHandler(error, next));
};

export default doesRecipeExist;

import { Recipe } from '../models';

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
    .catch((error) => {
      const err = new Error(error);
      err.status = 500;
      next(err);
    });
};

export default doesRecipeExist;

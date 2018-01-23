import { Recipe } from '../models';

const isOwner = (req, res, next) => {
  const { userID } = req;

  Recipe.findById(req.recipeId)
    .then((recipe) => {
      if (userID !== recipe.owner) {
        const err = new Error(`Not authorized to ${req.method === 'PUT' ? 'modify' : req.method.toLowerCase()} this recipe`);
        err.statusCode = 403;
        return next(err);
      }
      return next();
    });
};

export default isOwner;

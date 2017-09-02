import { Recipe } from '../models';

const isOwner = (req, res, next) => {
  const { userID } = req;

  Recipe.findById(req.params.id)
    .then((recipe) => {
      // check if recipe exist
      if (!recipe) {
        const err = new Error('Recipe not found');
        err.status = 404;
        return next(err);
      }
      // check if isOwner
      if (userID !== recipe.owner) {
        const err = new Error('Not authorized to delete this recipe');
        err.status = 403;
        return next(err);
      }
    })
    .catch((error) => {
      const err = new Error(error.errors[0].message);
      err.status = 401;
      next(err);
    });
};

export default isOwner;

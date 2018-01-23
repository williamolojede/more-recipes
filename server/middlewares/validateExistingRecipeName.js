import { Recipe } from '../models';

const validateExistingRecipeName = (req, res, next) => {
  const { userID: owner } = req;
  const { name } = req.body.recipe || req.body.update;

  Recipe.findOne({
    where: {
      name: {
        $iLike: name
      },
      owner
    }
  })
    .then((result) => {
      if (result) {
        if (req.method === 'PUT' && result.dataValues.id === req.recipeId) {
          return next();
        }
        const err = new Error('You already created a recipe with this name!');
        err.statusCode = 409;
        return next(err);
      }
      next();
    });
};

export default validateExistingRecipeName;

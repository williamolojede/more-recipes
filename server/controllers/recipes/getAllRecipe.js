import { Recipe } from '../../models/index';

const getAllRecipe = (req, res, next) => {
  Recipe.findAll()
    .then(recipes => res.status(200).send({ recipes: [...recipes], message: 'success' }))
    .catch((error) => {
      const err = new Error(error.errors[0].message);
      err.status = 400;
      next(err);
    });
};

export default getAllRecipe;

import { Recipe } from '../../models/index';

const deleteRecipe = (req, res, next) => {
  const { userID } = req;
  // const decoded = jwt.decode(token);
  Recipe.findById(req.params.id)
    .then((recipe) => {
      if (!recipe) {
        const err = new Error('Recipe not found');
        err.status = 404;
        return next(err);
      }
      if (userID !== recipe.owner) {
        const err = new Error('Not authorized to delete this recipe');
        err.status = 403;
        return next(err);
      }
      recipe.destroy()
        .then(() => res.status(410).send({ message: 'success' }))
        .catch(err => console.error(err));
    })
    .catch((error) => {
      const err = new Error(error.errors[0].message);
      err.status = 401;
      next(err);
    });
};

export default deleteRecipe;

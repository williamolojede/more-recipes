import { Recipe } from '../../models/index';
import systemErrorHandler from '../../helpers/systemErrorHandler';

const deleteRecipe = (req, res, next) => {
  const { userID } = req;
  // const decoded = jwt.decode(token);
  Recipe.findById(req.params.id)
    .then((recipe) => {
      if (userID !== recipe.owner) {
        const err = new Error('Not authorized to delete this recipe');
        err.status = 403;
        return next(err);
      }
      recipe.destroy()
        .then(() => res.status(200).send({ message: 'success' }))
        .catch(error => systemErrorHandler(error, next));
    })
    .catch(error => systemErrorHandler(error, next));
};

export default deleteRecipe;

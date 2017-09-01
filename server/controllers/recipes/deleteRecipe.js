import jwt from 'jsonwebtoken';
import { Recipe } from '../../models/index';

const deleteRecipe = (req, res, next) => {
  const { token } = req.query;
  const decoded = jwt.decode(token);
  Recipe.findById(req.params.id)
    .then((recipe) => {
      if (!recipe) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
      }
      if (decoded.user.id !== recipe.owner) {
        const err = new Error('No Authorization');
        err.status = 401;
        next(err);
      }
      recipe.destroy()
        .then(output => res.status(200).send(output))
        .catch(err => console.error(err));
    })
    .catch((error) => {
      const err = new Error(error.errors[0].message);
      err.status = 401;
      next(err);
    });
};

export default deleteRecipe;

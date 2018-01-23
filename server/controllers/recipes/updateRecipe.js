import { Recipe } from '../../models/index';
import helpers from '../../helpers';

const updateRecipe = (req, res, next) => {
  const { update } = req.body;

  Recipe.findById(req.params.id)
    .then((oldRecipe) => {
      // check for invalid property name on update object
      if (helpers.validateKeyNames(oldRecipe.dataValues, update)) {
        const err = new Error('Invalid property name(s) on update object');

        err.statusCode = 400;
        return next(err);
      }

      oldRecipe.update(update)
        .then(newRecipe => res.status(200).send({
          status: 'success',
          message: 'Recipe updated successfully',
          recipe: newRecipe
        }))
        .catch(error => helpers.systemErrorHandler({
          msg: error.errors[0].message,
          code: 400
        }, next));
    })
    .catch(error => helpers.systemErrorHandler(error, next));
};

export default updateRecipe;

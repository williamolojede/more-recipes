import { Recipe } from '../../models/index';
import systemErrorHandler from '../../helpers/systemErrorHandler';

const updateRecipe = (req, res, next) => {
  const { userID } = req;
  const { update } = req.body;

  const isEmpty = (obj) => {
    const keys = Object.keys(obj);
    if (keys.length === 0) return true;
    return false;
  };

  const hasInvalidKeyName = (right, wrong) => {
    // get keys
    const rightKeys = Object.keys(right.dataValues);
    const wrongKeys = Object.keys(wrong);
    // filter for invalid key(s)
    const invalid = wrongKeys.filter(wrongKey => !rightKeys.includes(wrongKey));
    if (invalid.length === 0) return false;
    return true;
  };

  if (!update || isEmpty(update) === true) {
    const err = new Error('Update property required or can not be empty');
    err.statusCode = 400;
    return next(err);
  }
  Recipe.findById(req.params.id)
    .then((oldRecipe) => {
      // check if isOwner
      if (userID !== oldRecipe.owner) {
        const err = new Error('Not authorized to modify this recipe');
        err.statusCode = 403;
        return next(err);
      }
      // check for invalid property name on update object
      if (hasInvalidKeyName(oldRecipe, req.body.update)) {
        const err = new Error('Invalid property name(s) on update object');
        err.statusCode = 400;
        return next(err);
      }
      oldRecipe.update(req.body.update)
        .then(newRecipe => res.status(200).send({
          status: 'success',
          message: 'Recipe updated successfully',
          recipe: newRecipe
        }))
        .catch(error => systemErrorHandler({
          msg: error.errors[0].message,
          code: 400
        }, next));
    })
    .catch(error => systemErrorHandler(error, next));
};

export default updateRecipe;

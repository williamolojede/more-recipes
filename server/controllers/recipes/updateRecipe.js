import { Recipe } from '../../models/index';

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
    const invalid = wrongKeys.filter(el => !rightKeys.includes(el));
    if (invalid.length === 0) return false;
    return true;
  };

  if (!update || isEmpty(update) === true) {
    const err = new Error('update property required or can not be empty');
    err.status = 400;
    return next(err);
  }
  Recipe.findById(req.params.id)
    .then((oldRecipe) => {
      // check if recipe exist
      if (!oldRecipe) {
        const err = new Error('Recipe not found');
        err.status = 404;
        return next(err);
      }
      // check if isOwner
      if (userID !== oldRecipe.owner) {
        const err = new Error('Not authorized to modify this recipe');
        err.status = 403;
        return next(err);
      }
      // check for invalid property name on update object
      if (hasInvalidKeyName(oldRecipe, req.body.update)) {
        const err = new Error('invalid property name(s) on update object');
        err.status = 400;
        return next(err);
      }
      oldRecipe.update(req.body.update)
        .then(newRecipe => res.status(200).send({ message: 'success', recipe: newRecipe }))
        .catch((error) => {
          const err = new Error(error);
          err.status = 500;
          next(err);
        });
    })
    .catch((error) => {
      const err = new Error(error);
      err.status = 500;
      next(err);
    });
};

export default updateRecipe;
//  a middleware for all routes a the owner is not permited to perform action
// Requires : doesRecipeExist to know the owner of the recipe
// Requires : requiresToken to know the userId of the token used in the request

const ownerNotAllowed = (req, res, next) => {
  const { userID, recipeOwner } = req;

  // ensures owner doesn't favorite their own recipe
  if (recipeOwner === userID) {
    const err = new Error('you are not allowed to perform this action on your own recipe');
    err.status = 403;
    return next(err);
  }

  return next();
};

export default ownerNotAllowed;

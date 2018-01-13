//  a middleware for all routes a the owner is not permited to perform action
// Requires : validateRecipeId to know the owner of the recipe
// Requires : requiresToken to know the userId of the token used in the request

const restrictOwnerActions = (req, res, next) => {
  const { userID, recipeOwner } = req;

  // ensures owner doesn't favorite their own recipe
  if (recipeOwner === userID) {
    const err = new Error('You are not allowed to perform this action on your own recipe');
    err.statusCode = 403;
    return next(err);
  }

  return next();
};

export default restrictOwnerActions;

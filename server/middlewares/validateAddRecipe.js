// could have a custom error on db but error
// https://github.com/sequelize/sequelize/issues/1500#issuecomment-322009204

const validateAddRecipe = (req, res, next) => {
  if (req.body.recipe === undefined) {
    const err = new Error('Recipe property is required on request body, see documentation');
    err.statusCode = 400;
    return next(err);
  }

  const { name, description } = req.body.recipe;
  if (name === undefined && description === undefined) {
    const err = new Error('Recipe name and description are required');
    err.statusCode = 400;
    return next(err);
  } else if (name === undefined) {
    const err = new Error('Recipe name is required');
    err.statusCode = 400;
    return next(err);
  } else if (description === undefined) {
    const err = new Error('Recipe description is required');
    err.statusCode = 400;
    return next(err);
  }

  return next();
};

export default validateAddRecipe;

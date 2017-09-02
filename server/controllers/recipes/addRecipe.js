import { Recipe } from '../../models/index';

const addRecipe = (req, res, next) => {
  const { name, description, img_url, ingredients, instructions } = req.body;
  Recipe.create({
    name,
    description,
    img_url,
    ingredients,
    instructions,
    owner: req.userID
  })
    .then(recipe => res.status(201).json(recipe))
    .catch((error) => {
      const err = new Error(error.errors[0].message);
      err.status = 400;
      next(err);
    });
};

export default addRecipe;

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
    .then(recipe => res.status(201).json({ recipe, message: 'success' }))
    .catch((error) => {
      const err = new Error(error);
      err.status = 500;
      next(err);
    });
};

export default addRecipe;

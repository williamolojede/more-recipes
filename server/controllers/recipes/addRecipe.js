import jwt from 'jsonwebtoken';
import { Recipe } from '../../models/index';

const addRecipe = (req, res, next) => {
  const { token } = req.query;
  const decoded = jwt.decode(token);

  const { name, description, img_url, ingredients, instructions } = req.body;
  Recipe.create({
    name,
    description,
    img_url,
    ingredients,
    instructions,
    owner: decoded.user.id
  })
    .then(recipe => res.status(200).json(recipe))
    .catch((error) => {
      const err = new Error(error.errors[0].message);
      err.status = 400;
      next(err);
    });
};

export default addRecipe;

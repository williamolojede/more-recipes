import { Recipe } from '../../models/index';
import systemErrorHandler from '../../helpers/systemErrorHandler';

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
    .then(recipe => res.status(201).json({ recipe, message: 'recipe created successfully', status: 'success' }))
    .catch(error => systemErrorHandler({
      msg: error.errors[0].message,
      code: 400
    }, next));
};

export default addRecipe;

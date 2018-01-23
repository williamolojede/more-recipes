import { Recipe } from '../../models/index';
import systemErrorHandler from '../../helpers/systemErrorHandler';

const deleteRecipe = (req, res, next) => {
  Recipe.findById(req.params.id)
    .then(recipe => recipe.destroy())
    .then(() => res.status(200).send({ status: 'success', message: 'Recipe deleted successfully' }))
    .catch(error => systemErrorHandler(error, next));
};

export default deleteRecipe;

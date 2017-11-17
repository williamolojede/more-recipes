import systemErrorHandler from '../../helpers/systemErrorHandler';
import findRecipe from '../../helpers/findRecipe';

const reviewRecipe = (req, res, next) => {
  const { id } = req.params;

  findRecipe(id)
    .then(recipe => res.status(200).send({ recipe, message: 'success' }))
    .catch(error => systemErrorHandler(error, next));
};

export default reviewRecipe;

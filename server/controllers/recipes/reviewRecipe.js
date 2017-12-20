import { Review } from '../../models/index';
import systemErrorHandler from '../../helpers/systemErrorHandler';
import findRecipe from '../../helpers/findRecipe';

const reviewRecipe = (req, res, next) => {
  const { content } = req.body;
  const { userID: userId } = req;
  const { id: recipeId } = req.params;

  Review.create({ userId, recipeId, content })
    .then(() => findRecipe(recipeId))
    .then(recipe => res.status(200).send({ status: 'success', recipe, message: 'Your review has been recorded' }))
    .catch(error => systemErrorHandler({
      msg: error.errors[0].message,
      code: 400
    }, next));
};

export default reviewRecipe;


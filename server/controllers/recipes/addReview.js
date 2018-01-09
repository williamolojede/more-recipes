import { Review } from '../../models/index';
import systemErrorHandler from '../../helpers/systemErrorHandler';
import { findReviews } from './getReviews';

const addReview = (req, res, next) => {
  const { content } = req.body;
  const { userID: userId } = req;
  const { id: recipeId } = req.params;

  Review.create({ userId, recipeId, content })
    .then(() => findReviews(recipeId))
    .then(reviews => res.status(200).send({ status: 'success', reviews, message: 'Your review has been recorded' }))
    .catch(error => systemErrorHandler({
      msg: error.errors[0].message,
      code: 400
    }, next));
};

export default addReview;


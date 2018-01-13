import { Review } from '../../models/index';
import helpers from '../../helpers';
import { findReviews } from './getReviews';

const addReview = (req, res, next) => {
  const { content } = req.body;
  const { userID: userId } = req;
  const { id: recipeId } = req.params;

  Review.create({ userId, recipeId, content })
    .then(() => findReviews(req))
    .then(({ rows: reviews, pagination }) => res.status(201).send({
      status: 'success',
      reviews,
      pagination,
      message: 'Your review has been recorded'
    }))
    .catch(error => helpers.systemErrorHandler({
      msg: error.errors[0].message,
      code: 400
    }, next));
};

export default addReview;


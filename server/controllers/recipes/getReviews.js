import { User, Review } from '../../models';
import helpers from '../../helpers';

export const findReviews = (req) => {
  const recipeId = parseInt(req.params.id, 10);
  const config = {
    where: { recipeId },
    attributes: ['id', 'content', 'createdAt'],
    include: [
      { model: User, attributes: ['id', 'username', 'fullname'] }
    ],
    order: [['id', 'DESC']]
  };

  return helpers.fetch(config, req.query, Review);
};

const getReviews = (req, res, next) => {
  findReviews(req)
    .then(({ rows: reviews, pagination }) => res.status(200).send({
      status: 'success',
      reviews,
      pagination
    }))
    .catch(error => helpers.systemErrorHandler(error, next));
};

export default getReviews;

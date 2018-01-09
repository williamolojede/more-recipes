import { User, Review } from '../../models';
import systemErrorHandler from '../../helpers/systemErrorHandler';

export const findReviews = recipeId => Review.findAll({
  where: { recipeId },
  attributes: ['id', 'content', 'createdAt'],
  include: [
    { model: User, attributes: ['id', 'username', 'fullname'] }
  ],
  order: [['id', 'DESC']]
});

const getReviews = (req, res, next) => {
  const { id } = req.params;

  findReviews(parseInt(id, 10))
    .then(reviews => res.status(200).send({ status: 'success', reviews }))
    .catch(error => systemErrorHandler(error, next));
};

export default getReviews;

import { Recipe, Review, User } from '../../models/index';
import systemErrorHandler from '../../helpers/systemErrorHandler';

const getAllRecipe = (req, res, next) => {
  const { sort, order } = req.query;

  //  if query is passed
  if (sort && order) {
    // if the wrong sort order is passed
    if (order !== 'ascending' && order !== 'descending') {
      const err = new Error('invalid sort order');
      err.status = 400;
      return next(err);
    }
    return Recipe.findAll({
      order: [['upVoteCount', 'DESC']],
      include: [
        { model: Review, as: 'reviews' },
        { model: User, attributes: ['id', 'username', 'fullname'] }
      ]
    })
      .then(recipes => res.status(200).send({ recipes, message: 'success' }))
      .catch(error => systemErrorHandler(error, next));
  }
  Recipe.findAll({
    include: [
      { model: Review, as: 'reviews' },
      { model: User, attributes: ['id', 'username', 'fullname'] }
    ]
  })
    .then(recipes => res.status(200).send({ recipes, message: 'success' }))
    .catch(error => systemErrorHandler(error, next));
};
export default getAllRecipe;

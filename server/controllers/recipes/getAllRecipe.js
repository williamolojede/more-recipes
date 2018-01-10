import { Recipe, User } from '../../models/index';
import helpers from '../../helpers';

const getAllRecipe = (req, res, next) => {
  const { sort, order, search } = req.query;

  //  if query is passed
  if (sort && order) {
    const sortTypes = ['upvotes', 'downvotes'];
    const orderOptions = ['ascending', 'descending'];

    // if the wrong sort order is passed
    if (!orderOptions.includes(order)) {
      const err = new Error('invalid sort order');
      err.statusCode = 400;
      return next(err);
    }

    if (!sortTypes.includes(sort)) {
      const err = new Error('invalid sort type');
      err.statusCode = 400;
      return next(err);
    }
    return helpers.fetch(
      {
        order: [['upVoteCount', 'DESC']],
        include: [{ model: User, attributes: ['id', 'username', 'fullname'] }],
      }, req.query, Recipe
    )
      .then(({ rows: recipes, pagination }) => res.status(200).send({
        recipes,
        pagination,
        message: 'success'
      }))
      .catch(error => helpers.systemErrorHandler(error, next));
  } else if (search) {
    return Recipe.findAll({
      where: {
        $or: [
          { name: { $ilike: `%${search}%` } },
          { ingredients: { $contains: [search] } }
        ],
      }
    })
      .then(recipes => res.status(200).send({ recipes }))
      .catch(error => helpers.systemErrorHandler(error, next));
  }

  helpers.fetch(
    {
      include: [
        { model: User, attributes: ['id', 'username', 'fullname'] }
      ]
    },
    req.query, Recipe
  )
    .then(({ rows: recipes, pagination }) => res.status(200).send({
      recipes,
      pagination,
      status: 'success'
    }))
    .catch(error => helpers.systemErrorHandler(error, next));
};
export default getAllRecipe;

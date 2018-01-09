import { Recipe, User } from '../../models/index';
import systemErrorHandler from '../../helpers/systemErrorHandler';

const allRecipe = (config = {}, limit = 12, page = 1) => {
  const offset = (page - 1) * limit;

  return Recipe.findAndCountAll({
    limit,
    offset,
    ...config
  })
    .then(({ count: totalCount, rows: recipes }) => {
      const last = Math.ceil(totalCount / limit);
      const pages = [];
      for (let i = 1; i <= last; i += 1) {
        pages.push(i);
      }

      const pagination = {
        pages,
        totalCount,
        pageSize: recipes.length,
        page,
        last
      };
      return {
        recipes,
        pagination
      };
    });
};

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

    return allRecipe(
      {
        order: [['upVoteCount', 'DESC']],
        include: [{ model: User, attributes: ['id', 'username', 'fullname'] }],
      },
      parseInt(req.query.limit, 10) || undefined,
      parseInt(req.query.page, 10) || undefined
    )
      .then(({ recipes, pagination }) => res.status(200).send(
        { recipes, pagination, message: 'success' }
      ))
      .catch(error => systemErrorHandler(error, next));
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
      .catch(error => systemErrorHandler(error, next));
  }

  allRecipe({
    include: [
      { model: User, attributes: ['id', 'username', 'fullname'] }
    ]
  })
    .then(({ recipes, pagination }) => res.status(200).send({ recipes, pagination, status: 'success' }))
    .catch(error => systemErrorHandler(error, next));
};
export default getAllRecipe;

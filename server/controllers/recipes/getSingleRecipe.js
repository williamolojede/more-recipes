import { Recipe, Review, User } from '../../models/index';
import systemErrorHandler from '../../helpers/systemErrorHandler';

const reviewRecipe = (req, res, next) => {
  const { id } = req.params;

  Recipe.findById(id, {
    include: [
      {
        model: Review,
        as: 'reviews',
        include: [
          { model: User, attributes: ['id', 'username', 'fullname'] }
        ]
      },
      { model: User, attributes: ['id', 'username', 'fullname'] }
    ]
  })
    .then(recipe => res.status(200).send({ recipe, message: 'success' }))
    .catch(error => systemErrorHandler(error, next));
};

export default reviewRecipe;

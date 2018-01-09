import systemErrorHandler from '../../helpers/systemErrorHandler';
import { Recipe, User } from '../../models';

const getSingleRecipe = (req, res, next) => {
  const { id } = req.params;

  Recipe.findById(id, {
    include: [
      { model: User, attributes: ['id', 'username', 'fullname'] }
    ]
  })
    .then(recipe => res.status(200).send({ recipe, message: 'success' }))
    .catch(error => systemErrorHandler(error, next));
};

export default getSingleRecipe;

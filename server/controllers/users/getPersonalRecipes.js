import { Recipe } from '../../models/index';
import helpers from '../../helpers';

const getPersonalRecipes = (req, res, next) => {
  const { uid } = req.params;

  const config = {
    where: { owner: parseInt(uid, 10) },
  };

  helpers.fetch(config, req.query, Recipe)
    .then(({ rows: recipes, pagination }) => res.status(200).send({
      status: 'success',
      recipes,
      pagination
    }))
    .catch(error => helpers.systemErrorHandler(error, next));
};

export default getPersonalRecipes;

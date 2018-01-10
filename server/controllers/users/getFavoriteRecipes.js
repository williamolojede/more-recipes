import { Recipe, Favorite } from '../../models/index';
import helpers from '../../helpers';

const getUserFavorites = (req, res, next) => {
  const { uid } = req.params;

  const config = {
    where: { userId: parseInt(uid, 10) },
    include: { model: Recipe }
  };

  helpers.fetch(config, req.query, Favorite)
    .then(({ rows: favorites, pagination }) => {
      const recipes = [];
      favorites.forEach((favorite) => {
        recipes.push(favorite.dataValues.Recipe.dataValues);
      });
      return res.status(200).send({
        status: 'success',
        recipes,
        pagination
      });
    })
    .catch(error => helpers.systemErrorHandler(error, next));
};

export default getUserFavorites;

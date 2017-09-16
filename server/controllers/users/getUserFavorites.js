import { Recipe, Favorite } from '../../models/index';
import systemErrorHandler from '../../helpers/systemErrorHandler';

const getUserFavorites = (req, res, next) => {
  const { userID } = req;
  const { uid } = req.params;
  // checks if the userID gotten from decoding the token === uid in the request parameter
  // two conditions if they are not equal:
  // 1. token for user A is used to get user B's favorite
  // 2. the uid doesn't exist on the user table

  if (userID !== parseInt(uid, 10)) {
    const err = new Error('invalid user authorization token or user doesn\'t exist');
    err.status = 403;
    return next(err);
  }

  Favorite.findAll({ where: { userId: parseInt(uid, 10) }, include: { model: Recipe } })
    .then((favorites) => {
      const favoritesCount = favorites.length;
      if (favoritesCount === 0) {
        return res.status(200).send({ status: 'success', recipes: null, message: 'user has no recipe in his/her favorite list' });
      }
      const recipes = [];
      favorites.forEach((el) => {
        recipes.push(el.dataValues.Recipe.dataValues);
      });
      return res.status(200).send({ status: 'success', recipes, message: `${favoritesCount} recipe(s) found in user's favorite list` });
    })
    .catch(error => systemErrorHandler(error, next));
};

export default getUserFavorites;

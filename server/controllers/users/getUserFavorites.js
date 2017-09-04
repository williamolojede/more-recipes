import { Recipe, Favorite } from '../../models/index';

const getUserFavorites = (req, res, next) => {
  const { userID } = req;
  const { uid } = req.params;
  // checks if the userID gotten from decoding the token === uid in the request parameter
  // also the userID forms that a user with the token exists on the user table do if
  // the uid doesn't match it it means it doesnt exist
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
    });
};

export default getUserFavorites;

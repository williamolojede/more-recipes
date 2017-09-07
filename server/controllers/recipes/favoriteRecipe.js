import { Favorite } from '../../models/index';
import systemErrorHandler from '../../helpers/systemErrorHandler';

const favoriteRecipe = (req, res, next) => {
  const { userID } = req;
  const recipeID = req.params.id;

  // abstracted the favorite creation so i'm not duplicating the code
  const createFavorite = (userId, recipeId) => Favorite.create({ userId, recipeId })
    .then(() => next())
    .catch(error => systemErrorHandler(error, next));

  Favorite.findAll({ where: { recipeId: recipeID } })
    .then((favorites) => {
      // check if the favorite table is empty i:e its the first favorite for the recipe
      if (favorites.length === 0) {
        return createFavorite(userID, recipeID);
      }

      // get list of all userId that has already favorited the recipe
      const alreadyfavorited = [];
      favorites.forEach((el) => {
        alreadyfavorited.push(el.dataValues.userId);
      });

      const userFavorite = favorites.filter(el => el.dataValues.userId === userID)[0];

      // if current user already favorited => remove
      if (alreadyfavorited.includes(userID)) {
        return Favorite.findById(userFavorite.dataValues.id)
          .then(favorite => favorite.destroy())
          .then(() => {
            req.favoriteDelete = 'true';
            next();
          });
      }
      createFavorite(userID, recipeID);
    });
};

export default favoriteRecipe;

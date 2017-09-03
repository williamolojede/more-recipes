import { Favorite } from '../../models/index';

const favoriteRecipe = (req, res, next) => {
  const { userID, recipeOwner } = req;
  const recipeId = req.params.id;

  // ensures owner doesn't favorite their own recipe
  if (recipeOwner === userID) {
    const err = new Error('you are not allowed to vote on your own recipe');
    err.status = 403;
    return next(err);
  }

  Favorite.findAll({ where: { recipeId } })
    .then((favorites) => {
      // check if the favorite table is empty i:e its the first favorite for the recipe
      if (favorites.length === 0) {
        return Favorite.create({
          userId: userID,
          recipeId
        })
          .then(() => res.status(200).send({ status: 'success', message: 'recipe added to your favorite list' }))
          .catch((error) => {
            const err = new Error(error);
            err.status = 500;
            return next(err);
          });
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
          .then(() => res.status(200).send({ message: 'recipe removed from your favorite list', status: 'success' }));
      }
      Favorite.create({
        userId: userID,
        recipeId
      })
        .then(() => res.status(200).send({ status: 'success', message: 'recipe added to your favorite list' }))
        .catch((error) => {
          const err = new Error(error);
          err.status = 500;
          return next(err);
        });
    });
};

export default favoriteRecipe;

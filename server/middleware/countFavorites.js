import { Favorite, Recipe } from '../models/index';
import systemErrorHandler from '../helpers/systemErrorHandler';

const count = (req, res, next) => {
  const { id } = req.params;
  let message;
  if (req.favoriteDelete) message = 'recipe removed from your favorite list';
  else message = 'recipe added to your favorite list';

  Favorite.count({ where: { recipeId: id } })
    .then((favoriteCount) => {
      Recipe.findById(id)
        .then(recipe => recipe.update({ favoriteCount })
          .then(newRecipe => res.status(200).send({ recipe: newRecipe, status: 'success', message })))
        .catch(error => systemErrorHandler(error, next));
    })
    .catch(error => systemErrorHandler(error, next));
};

export default count;

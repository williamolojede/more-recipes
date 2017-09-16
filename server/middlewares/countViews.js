import { View, Recipe } from '../models';
import systemErrorHandler from '../helpers/systemErrorHandler';

const count = (req, res, next) => {
  const recipeId = req.params.id;
  const userId = req.userID;

  // create view,
  // count view,
  // update recipe viewcount
  const createView = () => View.create({ userId, recipeId })
    .then(() => View.count({ where: { recipeId } })
      .then(viewCount => Recipe.findById(recipeId)
        .then(recipe => recipe.update({ viewCount }))
        .then(() => next())
      )
    )
    .catch(error => systemErrorHandler(error, next));

  // find all views for current recipe
  View.findAll({ where: { recipeId } })
    .then((views) => {
      // check if the view table is empty i:e its the first view for the recipe
      if (views.length === 0) {
        return createView();
      }

      // get list of all userId that has already viewed the recipe
      const alreadyViewed = [];
      views.forEach((el) => {
        alreadyViewed.push(el.dataValues.userId);
      });

      // if current user already viewed just get recipe
      if (alreadyViewed.includes(userId)) {
        return next();
      }

      return createView();
    })
    .catch(error => systemErrorHandler(error, next));
};

export default count;

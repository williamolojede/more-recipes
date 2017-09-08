import { Review, Recipe } from '../../models/index';
import systemErrorHandler from '../../helpers/systemErrorHandler';

const reviewRecipe = (req, res, next) => {
  const { content } = req.body;
  const { userID } = req;
  const recipeID = req.params.id;

  // check if user already created review
  // check if no content is sent
  if (!content || content.trim() === '') {
    const err = new Error('the content of your review can not be empty');
    err.status = 400;
    return next(err);
  }
  // abstracted the favorite creation so i'm not duplicating the code
  const createReview = (userId, copy, recipeId) => Review.create({
    userId,
    recipeId,
    content: copy
  })
    .then(() => Recipe.findById(recipeID, { include: [{ model: Review, as: 'reviews' }] }))
    .then(recipe => res.status(200).send({ status: 'success', recipe, message: 'your review has been recorded' }))
    .catch(error => systemErrorHandler(error, next));

  Review.findAll({ where: { recipeId: recipeID } })
    .then((reviews) => {
      // check if the favorite table is empty i:e its the first favorite for the recipe
      if (reviews.length === 0) {
        return createReview(userID, content, recipeID);
      }

      // get list of all userId that has already reviewed the recipe
      const alreadyReviewed = [];
      reviews.forEach((el) => {
        alreadyReviewed.push(el.dataValues.userId);
      });
      // if current user already reviewed => notify
      if (alreadyReviewed.includes(userID)) {
        const err = new Error('you already wrote a review for this recipe');
        err.status = 403;
        return next(err);
      }

      createReview(userID, content, recipeID);
    });
};

export default reviewRecipe;


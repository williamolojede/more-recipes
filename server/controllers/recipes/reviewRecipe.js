import { Review } from '../../models/index';
import systemErrorHandler from '../../helpers/systemErrorHandler';

const reviewRecipe = (req, res, next) => {
  const { content } = req.body;
  const { userID } = req;
  const recipeId = req.params.id;

  // check if user already created review
  // check if no content is sent
  if (!content || content.trim() === '') {
    const err = new Error('the content of your review can not be empty');
    err.status = 400;
    return next(err);
  }

  Review.findAll({ where: { recipeId } })
    .then((reviews) => {
      // check if the favorite table is empty i:e its the first favorite for the recipe
      if (reviews.length === 0) {
        return Review.create({
          userId: userID,
          content,
          recipeId
        })
          .then(() => res.status(200).send({ status: 'success', message: 'your review has been recorded' }))
          .catch(error => systemErrorHandler(error, next));
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
      Review.create({
        userId: userID,
        content,
        recipeId
      })
        .then(() => res.status(200).send({ status: 'success', message: 'your review has been recorded' }))
        .catch(error => systemErrorHandler(error, next));
    });
};

export default reviewRecipe;

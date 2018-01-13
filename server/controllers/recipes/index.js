import createRecipe from './addRecipe';
import getAllRecipe from './getAllRecipe';
import updateRecipe from './updateRecipe';
import deleteRecipe from './deleteRecipe';
import voteRecipe from './voteRecipe';
import favoriteRecipe from './favoriteRecipe';
import addReview from './addReview';
import getSingleRecipe from './getSingleRecipe';
import getReviews from './getReviews';

const recipesController = {
  getAllRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  voteRecipe,
  favoriteRecipe,
  addReview,
  getSingleRecipe,
  getReviews
};


export default recipesController;

import createRecipe from './addRecipe';
import getAllRecipe from './getAllRecipe';
import updateRecipe from './updateRecipe';
import deleteRecipe from './deleteRecipe';
import voteRecipe from './voteRecipe';
import favoriteRecipe from './favoriteRecipe';
import reviewRecipe from './reviewRecipe';

const recipesController = {
  getAllRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  voteRecipe,
  favoriteRecipe,
  reviewRecipe
};


export default recipesController;

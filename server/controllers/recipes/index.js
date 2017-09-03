import createRecipe from './addRecipe';
import getAllRecipe from './getAllRecipe';
import updateRecipe from './updateRecipe';
import deleteRecipe from './deleteRecipe';
import voteRecipe from './voteRecipe';
import favoriteRecipe from './favoriteRecipe';

const recipesController = {
  getAllRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  voteRecipe,
  favoriteRecipe
};


export default recipesController;

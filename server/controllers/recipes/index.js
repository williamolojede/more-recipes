import createRecipe from './addRecipe';
import getAllRecipe from './getAllRecipe';
import updateRecipe from './updateRecipe';
import deleteRecipe from './deleteRecipe';
import voteRecipe from './voteRecipe';

const recipesController = {
  getAllRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  voteRecipe
};


export default recipesController;

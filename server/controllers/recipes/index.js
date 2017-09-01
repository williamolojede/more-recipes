import createRecipe from './addRecipe';
import getAllRecipe from './getAllRecipe';
import updateRecipe from './updateRecipe';
import deleteRecipe from './deleteRecipe';

const recipesController = {
  getAllRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
};


export default recipesController;

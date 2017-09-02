import express from 'express';
import recipesController from '../controllers/recipes';
import requiresToken from '../middleware/requiresToken';
import validateAddRecipe from '../middleware/validateAddRecipe';

const router = express.Router();

router.get('/', recipesController.getAllRecipe);
router.post('/', requiresToken, validateAddRecipe, recipesController.createRecipe);
// router.put('/:id', recipesController.updateRecipe);
router.delete('/:id', recipesController.deleteRecipe);

export default router;

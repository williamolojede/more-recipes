import express from 'express';
import recipesController from '../controllers/recipes';

const router = express.Router();

router.get('/', recipesController.getAllRecipe);
router.post('/', recipesController.createRecipe);
// router.put('/:id', recipesController.updateRecipe);
router.delete('/:id', recipesController.deleteRecipe);

export default router;

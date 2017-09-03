import express from 'express';
import recipesController from '../controllers/recipes';
import requiresToken from '../middleware/requiresToken';
import validateAddRecipe from '../middleware/validateAddRecipe';
import doesRecipeExist from '../middleware/doesRecipeExist';

// could be used on put and delete but the error won't be specific
// import isOwner from '../middleware/isOwner';

const router = express.Router();

// all recipe routes requires user to have a token
router.use('*', requiresToken);

router.get('/', recipesController.getAllRecipe);
router.post('/', validateAddRecipe, recipesController.createRecipe);
router.put('/:id', recipesController.updateRecipe);
router.delete('/:id', recipesController.deleteRecipe);
router.post('/:id/vote-:dir', doesRecipeExist, recipesController.voteRecipe);

export default router;

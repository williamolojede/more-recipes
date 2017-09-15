import express from 'express';
import recipesController from '../controllers/recipes';
import requiresToken from '../middleware/requiresToken';
import validateAddRecipe from '../middleware/validateAddRecipe';
import doesRecipeExist from '../middleware/doesRecipeExist';
import ownerNotAllowed from '../middleware/ownerNotAllowed';
import countVotes from '../middleware/countVotes';
import countFavorites from '../middleware/countFavorites';

// could be used on put and delete but the error won't be specific
// import isOwner from '../middleware/isOwner';

const router = express.Router();

// all recipe routes requires user to have a token
router.use('*', requiresToken);

router.get('/', recipesController.getAllRecipe);
router.post('/', validateAddRecipe, recipesController.createRecipe);

// checks if the recipe to be accessed exist
router.use('/:id', doesRecipeExist);

router.get('/:id', recipesController.getSingleRecipe);
router.put('/:id', recipesController.updateRecipe);
router.delete('/:id', recipesController.deleteRecipe);

// checks if the user is owner is allowed to perform action on recipe
// router.use('/:id/*', ownerNotAllowed);

router.post('/:id/vote-:dir', recipesController.voteRecipe, countVotes);
router.post('/:id/favorite', ownerNotAllowed, recipesController.favoriteRecipe, countFavorites);
router.post('/:id/reviews', recipesController.reviewRecipe);

export default router;

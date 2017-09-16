import express from 'express';
import recipesController from '../controllers/recipes';
import requiresToken from '../middlewares/requiresToken';
import validateAddRecipe from '../middlewares/validateAddRecipe';
import doesRecipeExist from '../middlewares/doesRecipeExist';
import ownerNotAllowed from '../middlewares/ownerNotAllowed';
import countVotes from '../middlewares/countVotes';
import countFavorites from '../middlewares/countFavorites';
import middlewares from '../middlewares';

// could be used on put and delete but the error won't be specific
// import isOwner from '../middleware/isOwner';

const router = express.Router();

// all recipe routes requires user to have a token
router.use('*', requiresToken);

router.get('/', recipesController.getAllRecipe);
router.post('/', validateAddRecipe, recipesController.createRecipe);

// checks if the recipe to be accessed exist
router.use('/:id', doesRecipeExist);

router.route('/:id')
  .get(middlewares.countViews, recipesController.getSingleRecipe)
  .put(recipesController.updateRecipe)
  .delete(recipesController.deleteRecipe);

// checks if the user is owner is allowed to perform action on recipe
// router.use('/:id/*', ownerNotAllowed);

router.post('/:id/vote-:dir', recipesController.voteRecipe, countVotes);
router.post('/:id/favorite', ownerNotAllowed, recipesController.favoriteRecipe, countFavorites);
router.post('/:id/reviews', recipesController.reviewRecipe);

export default router;

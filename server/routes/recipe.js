import express from 'express';
import recipesController from '../controllers/recipes';
import middlewares from '../middlewares';

// could be used on put and delete but the error won't be specific
// import isOwner from '../middleware/isOwner';

const router = express.Router();

// all recipe routes requires user to have a token
router.use('*', middlewares.requiresToken);

router.get('/', recipesController.getAllRecipe);
router.post(
  '/',
  middlewares.validateAddRecipe,
  middlewares.validateExistingRecipeName,
  recipesController.createRecipe
);

// checks if the recipe to be accessed exist
router.use('/:id', middlewares.validateRecipeId);

router.route('/:id')
  .get(middlewares.countViews, recipesController.getSingleRecipe)
  .put(
    middlewares.validateUpdate,
    middlewares.isOwner,
    middlewares.validateExistingRecipeName,
    recipesController.updateRecipe
  )
  .delete(middlewares.isOwner, recipesController.deleteRecipe);

router.post('/:id/vote-:dir',
  recipesController.voteRecipe,
  middlewares.countVotes
);

router.post('/:id/favorite',
  middlewares.restrictOwnerActions,
  recipesController.favoriteRecipe,
  middlewares.countFavorites
);

router.post('/:id/reviews', recipesController.addReview);
router.get('/:id/reviews', recipesController.getReviews);

export default router;

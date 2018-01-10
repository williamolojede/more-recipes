import express from 'express';
import userController from '../controllers/users';
import middlewares from '../middlewares';


const router = express.Router();

router.post('/signup',
  middlewares.validateSignup,
  userController.signup
);

router.post('/login',
  middlewares.validateLogin,
  userController.login
);

router.use('/:uid',
  middlewares.requiresToken,
  middlewares.validateUserId
);

router.get('/:uid',
  userController.getUserDetails
);

router.get('/:uid/recipes',
  userController.getPersonalRecipes
);

router.get('/:uid/favorites',
  userController.getFavoriteRecipes
);

export default router;

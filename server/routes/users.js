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

router.get('/:uid',
  middlewares.requiresToken,
  userController.getUserDetails
);

// router.get('/:uid/recipes',
//   middlewares.requiresToken,
//   userController.getUserRecipes
// );

router.get('/:uid/recipes',
  middlewares.requiresToken,
  userController.getUserFavorites
);

export default router;

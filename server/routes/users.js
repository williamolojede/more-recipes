import express from 'express';
import userController from '../controllers/users';
import requiresToken from '../middleware/requiresToken';


const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/:uid/recipes', requiresToken, userController.getUserFavorites);

export default router;

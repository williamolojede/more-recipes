import express from 'express';
import { User } from '../models/index';
import validateLogin from '../helpers/validateLogIn';

const router = express.Router();

router.post('/', (req, res, next) => {
  // makes sure both email and password are passed
  const validation = validateLogin(req.body);

  if (validation.valid) {
    const { email, password } = req.body;
    User.authenticate(email, password, (err, user) => {
      if (err || !user) {
        const err = new Error('Wrong email or password');
        err.status = 401;
        return next(err);
      }
      res.status(201).send({ message: 'sucess', user });
    });
  } else {
    const err = new Error(validation.message);
    err.status = validation.status;
    next(err);
  }
});

export default router;

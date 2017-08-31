import express from 'express';
import { User } from '../models/index';

const router = express.Router();

router.post('/', (req, res, next) => {
  const { email, fullname, password } = req.body;
  return User
    .create({ email, fullname, password })
    .then(() => res.status(201).send({ message: 'sucess' }))
    .catch((error) => {
      const err = new Error(error.errors[0].message);
      err.status = 400;
      return next(err);
    });
});

export default router;

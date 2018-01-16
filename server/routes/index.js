import express from 'express';
import users from './users';
import recipes from './recipe';

const v1 = express.Router();

v1.use('/v1/users', users);
v1.use('/v1/recipes', recipes);

// catch 404 and forward to error handler
v1.use((req, res, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  next(err);
});

export default v1;

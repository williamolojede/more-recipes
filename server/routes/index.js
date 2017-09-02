import express from 'express';
import users from './users';
import recipes from './recipe';

const v1 = express.Router();

v1.use('/v1/users', users);
v1.use('/v1/recipes', recipes);

export default v1;

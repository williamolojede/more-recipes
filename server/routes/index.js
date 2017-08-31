import express from 'express';
import signup from './signup';
import login from './login';
import login from './login';

const v1 = express.Router();

v1.use('/v1/user/signup', signup);
v1.use('/v1/user/login', login);
v1.use('/v1/recipe', recipe);

export default v1;

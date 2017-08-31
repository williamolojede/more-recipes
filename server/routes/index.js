import express from 'express';
import signup from './signup';
import login from './login';

const v1 = express.Router();

v1.use('/v1/signup', signup);
v1.use('/v1/login', login);

export default v1;

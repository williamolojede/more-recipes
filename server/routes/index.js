import express from 'express';
import signup from './signup';

const v1 = express.Router();

// v1.get('/v1/signup', () => {
//   console.log('hello')
// })

v1.use('/v1/signup', signup);
module.exports = v1;

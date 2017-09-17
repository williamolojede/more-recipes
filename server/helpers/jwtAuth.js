import jwt from 'jsonwebtoken';

const encode = data => jwt.sign(data, 'jsninja', { expiresIn: '1 hour' });

export default {
  encode
};

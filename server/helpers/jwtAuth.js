import jwt from 'jsonwebtoken';

const encode = data => jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1 hour' });

export default {
  encode
};

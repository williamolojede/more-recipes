import jwt from 'jsonwebtoken';
import { User } from '../../models/index';
import validateLogin from '../../helpers/validateLogIn';

const login = (req, res, next) => {
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
      const token = jwt.sign({ userID: user.id, }, 'jsninja', { expiresIn: '30 days' });
      return res.status(200).send({ message: 'success', token });
    });
  } else {
    const err = new Error(validation.message);
    err.status = validation.status;
    next(err);
  }
};

export default login;

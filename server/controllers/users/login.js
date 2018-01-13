import { User } from '../../models/index';
import sendAuthSuccess from '../../helpers/sendAuthSuccess';

const login = (req, res, next) => {
  const { email, password } = req.body.user;
  User.authenticate(email, password, (err, user) => {
    if (err || !user || err === undefined) {
      const err = new Error('Wrong email or password');
      err.statusCode = 401;
      return next(err);
    }

    sendAuthSuccess(res, user, 'You are successfully logged in', 200);
  });
};

export default login;

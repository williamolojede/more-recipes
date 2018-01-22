import { User } from '../../models/index';
import systemErrorHandler from '../../helpers/systemErrorHandler';
import sendAuthSuccess from '../../helpers/sendAuthSuccess';

const signup = (req, res, next) => {
  const { email, fullname, password } = req.body.user;
  User.create({ email, fullname, password })
    .then(user => sendAuthSuccess(res, user, 'Account created', 201))
    .catch((error) => {
      systemErrorHandler({
        msg: error.errors[0].message,
        code: error.errors[0].type === 'unique violation' ? 409 : 400
      }, next);
    });
};

export default signup;

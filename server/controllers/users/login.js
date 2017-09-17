import { User } from '../../models/index';
import validateLogin from '../../helpers/validateLogin';
import jwtAuth from '../../helpers/jwtAuth';

const login = (req, res, next) => {
  // makes sure both email and password are passed
  const validation = validateLogin(req.body.auth);
  if (validation.valid) {
    const { email, password } = req.body.auth;
    User.authenticate(email, password, (err, user) => {
      if (err || !user || err === undefined) {
        const err = new Error('Wrong email or password');
        err.status = 401;
        return next(err);
      }

      const userDetails = Object.assign({}, user.dataValues);
      delete userDetails.password;

      return res.status(200).send({
        status: 'success',
        user: userDetails,
        token: jwtAuth.encode({ userID: userDetails.id, })
      });
    });
  } else {
    const err = new Error(validation.message);
    err.status = validation.status;
    next(err);
  }
};

export default login;

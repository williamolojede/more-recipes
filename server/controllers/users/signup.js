import { User } from '../../models/index';
import validateSignup from '../../helpers/validateSignup';
import systemErrorHandler from '../../helpers/systemErrorHandler';
import jwtAuth from '../../helpers/jwtAuth';

const signup = (req, res, next) => {
  const validation = validateSignup(req.body.user);
  if (!validation.valid) {
    const err = new Error(validation.message);
    err.status = validation.status;
    return next(err);
  }

  const { email, fullname, password } = req.body.user;
  return User
    .create({ email, fullname, password })
    .then((user) => {
      const userDetails = Object.assign({}, user.dataValues);
      delete userDetails.password;

      res.status(201).send({
        status: 'success',
        message: 'account created',
        user: userDetails,
        token: jwtAuth.encode({ userID: userDetails.id, })
      });
    })
    .catch(error => systemErrorHandler({
      msg: error.errors[0].message,
      code: 400
    }, next));
};

export default signup;

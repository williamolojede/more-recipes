import { User } from '../../models/index';
import systemErrorHandler from '../../helpers/systemErrorHandler';
import jwtAuth from '../../helpers/jwtAuth';

const signup = (req, res, next) => {
  const { email, fullname, password } = req.body.user;
  User.create({ email, fullname, password })
    .then((user) => {
      const userDetails = Object.assign({}, user.dataValues);
      delete userDetails.password;

      return res.status(201).send({
        status: 'success',
        message: 'account created',
        user: userDetails,
        token: jwtAuth.encode({ user: userDetails, })
      });
    })
    .catch(error => systemErrorHandler({
      msg: error.errors[0].message,
      code: 400
    }, next));
};

export default signup;

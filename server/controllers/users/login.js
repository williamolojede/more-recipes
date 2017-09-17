import { User } from '../../models/index';
import jwtAuth from '../../helpers/jwtAuth';

const login = (req, res, next) => {
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
};

export default login;

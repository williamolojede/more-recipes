import { User } from '../../models/index';
import validateSignup from '../../helpers/validateSignup';

const signup = (req, res, next) => {
  const validation = validateSignup(req.body);
  if (!validation.valid) {
    const err = new Error(validation.message);
    err.status = validation.status;
    return next(err);
  }

  const { email, fullname, password } = req.body;
  return User
    .create({ email, fullname, password })
    .then(() => res.status(201).send({ status: 'success', message: 'account created' }))
    .catch((error) => {
      const err = new Error(error.errors[0].message);
      err.status = 400;
      return next(err);
    });
};

export default signup;

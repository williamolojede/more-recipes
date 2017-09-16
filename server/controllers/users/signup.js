import { User } from '../../models/index';
import validateSignup from '../../helpers/validateSignup';
import systemErrorHandler from '../../helpers/systemErrorHandler';

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
    .catch(error => systemErrorHandler({
      msg: error.errors[0].message,
      code: 400
    }, next));
};

export default signup;

import { User } from '../../models/index';

const signup = (req, res, next) => {
  const { email, fullname, password } = req.body;
  return User
    .create({ email, fullname, password })
    .then(() => res.status(201).send({ message: 'success' }))
    .catch((error) => {
      const err = new Error(error.errors[0].message);
      err.status = 400;
      return next(err);
    });
};

export default signup;

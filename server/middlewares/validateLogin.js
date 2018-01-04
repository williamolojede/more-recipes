const validateLogin = (req, res, next) => {
  if (req.body.user === undefined) {
    const err = new Error('User property is required on request body, see documentation!');
    err.statusCode = 400;
    return next(err);
  }

  const { email, password } = req.body.user;

  if (email && password) {
    return next();
  }
  const err = new Error('Email and password are required');
  err.statusCode = 400;
  return next(err);
};

export default validateLogin;


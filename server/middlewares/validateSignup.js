const errorBody = (msg) => {
  const err = new Error(msg);
  err.statusCode = 400;
  return err;
};

const validateSignup = (req, res, next) => {
  if (req.body.user === undefined) return next(errorBody('User property is required on request body, see documentation'));

  const { email, password, fullname } = req.body.user;

  if (password === undefined && email === undefined) return next(errorBody('Email and password fields are required'));
  if (email === undefined) return next(errorBody('Email field is required'));
  if (password === undefined) return next(errorBody('Password field is required'));
  if (password.trim() === '') return next(errorBody('Password can not be empty'));
  if (password.length < 6) return next(errorBody('Password must be minimum of 6 characters'));
  if (fullname === undefined) return next(errorBody('Fullname field is required'));

  return next();
};

export default validateSignup;

const errorBody = (msg) => {
  const err = new Error(msg);
  err.status = 400;
  return err;
};

const validateSignup = (req, res, next) => {
  if (req.body.user === undefined) return next(errorBody('user property is required on request body, see documentation'));

  const { email, password, fullname } = req.body.user;

  if (password === undefined && email === undefined) return next(errorBody('email and password fields are required'));
  if (email === undefined) return next(errorBody('email field is required'));
  if (password === undefined) return next(errorBody('password field is required'));
  if (password.trim() === '') return next(errorBody('password can not be empty'));
  if (password.length < 6) return next(errorBody('Password must be minimum of 6 characters'));
  if (fullname === undefined) return next(errorBody('fullname field is required'));

  return next();
};

export default validateSignup;

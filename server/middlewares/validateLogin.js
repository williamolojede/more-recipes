const validateLogin = (req, res, next) => {
  if (req.body.auth === undefined) {
    const err = new Error('auth property is required on request body, see documentation');
    err.status = 400;
    return next(err);
  }

  const { email, password } = req.body.auth;

  if (email && password) {
    return next();
  }
  const err = new Error('email and password are required');
  err.status = 400;
  return next(err);
};

export default validateLogin;


// const validateLogin = ({ email, password }) => {
// if (email && password) {
//   return { valid: true };
// }
// return { valid: false, message: 'email and password are required', status: 400 };
// };

// export default validateLogin;

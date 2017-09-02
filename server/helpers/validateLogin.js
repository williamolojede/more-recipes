const validateLogin = ({ email, password }) => {
  if (email && password) {
    return { valid: true };
  }
  return { valid: false, message: 'email and password are required', status: 400 };
};

export default validateLogin;

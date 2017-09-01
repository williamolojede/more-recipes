const validateLogin = ({ email, password }) => {
  if (email && password) {
    return { valid: true };
  }
  return { valid: false, message: 'email and password are required', status: 401 };
};

export default validateLogin;

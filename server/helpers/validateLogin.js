const validateLogin = ({ email, password }) => {
  if (email && password) {
    return { valid: true };
  }
  return { valid: false, message: 'Email and password are required', status: 401 };
};

export default validateLogin;

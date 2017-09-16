const validateSignup = ({ email, password, fullname }) => {
  if (password === undefined && email === undefined) return { valid: false, message: 'email and password fields are required', status: 400 };
  if (email === undefined) return { valid: false, message: 'email field is required', status: 400 };
  if (password === undefined) return { valid: false, message: 'password field is required', status: 400 };
  if (password.trim() === '') return { valid: false, message: 'password can not be empty', status: 400 };
  if (password.length < 6) return { valid: false, message: 'Password must be minimum of 6 characters', status: 400 };
  if (fullname === undefined) return { valid: false, message: 'fullname field is required', status: 400 };

  return { valid: true };
};

export default validateSignup;

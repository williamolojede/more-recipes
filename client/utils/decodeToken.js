import jwt from 'jsonwebtoken';

const decodeToken = () => {
  const token = localStorage.getItem('token');
  const { user: { id }, exp } = jwt.decode(token);
  return { id, exp };
};

export default decodeToken;

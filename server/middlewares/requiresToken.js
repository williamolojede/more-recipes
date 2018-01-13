import jwt from 'jsonwebtoken';
import { User } from '../models';
import systemErrorHandler from '../helpers/systemErrorHandler';

const requiresToken = (req, res, next) => {
  // token could provided via body, as a query string or in the header
  const token = req.body.token || req.query.token || req.headers.token;
  // the decoded
  let user;
  // check if token is passed
  if (!token) {
    const err = new Error('user authorization token required');
    err.statusCode = 400;
    return next(err);
  }

  // check if token is valid
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = decoded.user;
  } catch (error) {
    // check if token is outdated
    if (error.name === 'TokenExpiredError') {
      const err = new Error('expired user authorization token');
      err.statusCode = 401;
      return next(err);
    }
    // check if token is invalid/tampered with
    const err = new Error('invalid user authorization token');
    err.statusCode = 401;
    return next(err);
  }
  // check if user exists
  User.findById(user.id)
    .then((userData) => {
      if (!userData) {
        const err = new Error('invalid user authorization token');
        err.statusCode = 401;
        return next(err);
      }
      req.userID = user.id;
      return next();
    })
    .catch(error => systemErrorHandler(error, next));
};

export default requiresToken;

import jwt from 'jsonwebtoken';
import { User } from '../models';

const requiresToken = (req, res, next) => {
  // token could provided via body, as a query string or in the header
  const token = req.body.token || req.query.token || req.headers.token;
  let decoded;
  // check if token is passed
  if (!token) {
    const err = new Error('user authorization token required');
    err.status = 400;
    return next(err);
  }

  // check if token is valid
  try {
    decoded = jwt.verify(token, 'jsninja');
  } catch (error) {
    // check if token is outdated
    if (error.name === 'TokenExpiredError') {
      const err = new Error('expired user authorization token');
      err.status = 403;
      return next(err);
    }
    // check if token is invalid/tampered with
    const err = new Error('invalid user  authorization token');
    err.status = 403;
    return next(err);
  }
  User.findById(decoded.userID)
    .then((user) => {
      if (!user) {
        const err = new Error('invalid user authorization token');
        err.status = 403;
        return next(err);
      }
      req.userID = decoded.userID;
      return next();
    })
    .catch((error) => {
      const err = new Error(error);
      err.status = 500;
      next(err);
    });
  // // check if userID exist of users table
  // req.userID = decoded.userID;
  // return next();
};

export default requiresToken;

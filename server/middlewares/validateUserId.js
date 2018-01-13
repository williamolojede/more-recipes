import { User } from '../models';
import systemErrorHandler from '../helpers/systemErrorHandler';
import validateIdParam from '../helpers/validateIdParam';

const validateUserId = (req, res, next) => {
  const uid = parseInt(req.params.uid, 10);

  if (Number.isNaN(uid) || uid < 0) {
    return validateIdParam({ type: 'invalid-param-value', value: req.params.uid }, 'User', next);
  }

  User.findById(req.params.uid)
    .then((user) => {
      validateIdParam({ type: 'not-found', value: user }, 'User', next);
      return next();
    })
    .catch(error => systemErrorHandler(error, next));
};

export default validateUserId;

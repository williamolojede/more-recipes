import { User } from '../models';
import systemErrorHandler from '../helpers/systemErrorHandler';
import itemDoesNotExist from '../helpers/itemDoesNotExist';

const doesUserExist = (req, res, next) => {
  User.findById(req.params.uid)
    .then((user) => {
      itemDoesNotExist(user, 'user', next);
      return next();
    })
    .catch(error => systemErrorHandler(error, next));
};

export default doesUserExist;

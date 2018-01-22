import { User } from '../../models/index';
import helpers from '../../helpers';

const updateUserDetails = (req, res, next) => {
  const { update } = req.body;
  const { userID } = req;
  const uid = parseInt(req.params.uid, 10);

  if (uid !== userID) {
    const err = new Error('Not authorized to modify this user');
    err.statusCode = 403;
    return next(err);
  }

  User.findById(req.params.uid)
    .then((oldUserDetails) => {
      // check for invalid property name on update object

      if (helpers.validateKeyNames(oldUserDetails.dataValues, update)) {
        const err = new Error('Invalid property name(s) on update object');
        err.statusCode = 400;
        return next(err);
      }

      // check if email exist already
      oldUserDetails.update(req.body.update)
        .then((newUserDetails) => {
          delete newUserDetails.dataValues.password;
          return res.status(200).send({
            status: 'success',
            message: 'User Details updated successfully',
            user: newUserDetails
          });
        })
        .catch((error) => {
          helpers.systemErrorHandler({
            msg: error.errors[0].message,
            code: error.errors[0].type === 'unique violation' ? 409 : 400
          }, next);
        });
    })
    .catch(error => helpers.systemErrorHandler(error, next));
};


export default updateUserDetails;

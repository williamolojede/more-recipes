import jwtAuth from './jwtAuth';

/*
 * Send Api response for a succesfull authentication(login or signup)
 * @param {Object} res - Express Response Object
 * @param {String} $1.id - Authenticated user id
 * @param {String} message - Message to send back to api user
 * @param {Number} statusCode - Http status code
 */
const sendAuthResponse = (res, user, message, statusCode) => {
  const userDetails = Object.assign({}, user.dataValues);
  delete userDetails.password;

  return res.status(statusCode).send({
    status: 'success',
    message,
    user: userDetails,
    token: jwtAuth.encode({ user: { id: userDetails.id } })
  });
};

export default sendAuthResponse;

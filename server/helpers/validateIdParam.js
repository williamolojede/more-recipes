/**
 * Validates the id parameter used in endpoints
 * @param  {Object} $0
 * @param  {string} $0.type - the type of error
 * @param  {string | undefined | Object} $0.value - the id or result of querying the db with the id
 * @param  {string} modelName - the DB model the endpoints targets
 * @param  {function} callback - function to be called after checking
 * @return {undefined}
 */
const validateIdParam = ({ type, value }, modelName, callback) => {
  if (type === 'not-found' && !value) {
    const err = new Error(`${modelName} not found`);
    err.statusCode = 404;
    return callback(err);
  } else if (type === 'invalid-param-value' && value) {
    const err = new Error(`${value} isn't a valid ${modelName} id value, see documentation!`);
    err.statusCode = 400;
    return callback(err);
  }
};

export default validateIdParam;

/**
 * Checks if an type does not exist, and calls a function to handle the error
 * @param  {object} type - the item to be checked
 * @param  {string} itemName - the name of the type checked,
 * used to display apppropriate error message
 * @param  {function} callback - function to be called after checking
 * @return {undefined}
 */
const validateIdParam = ({ type, value }, itemName, callback) => {
  if (type === 'not-found' && !value) {
    const err = new Error(`${itemName} not found`);
    err.statusCode = 404;
    return callback(err);
  } else if (type === 'invalid-param-value' && value) {
    const err = new Error(`${value} isn't a valid ${itemName} id value, see documentation!`);
    err.statusCode = 400;
    return callback(err);
  }
};

export default validateIdParam;

/**
 * Checks if an item does not exist, and calls a function to handle the error
 * @param  {object} item - the item to be checked
 * @param  {string} itemName - the name of the item checked,
 * used to display apppropriate error message
 * @param  {function} callback - function to be called after checking
 * @return {undefined}
 */
const itemDoesNotExist = (item, itemName, callback) => {
  if (!item) {
    const err = new Error(`${itemName} not found`);
    err.statusCode = 404;
    callback(err);
  }
};

export default itemDoesNotExist;

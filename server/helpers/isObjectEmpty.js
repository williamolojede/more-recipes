/**
 * Checks if an object is empty, i.e contains no key value pair
 * @param {Object} obj - Object to be checked
 * @return {Boolean} - result of checking
 */
const isEmpty = (obj) => {
  const keys = Object.keys(obj);
  if (keys.length === 0) return true;
  return false;
};

export default isEmpty;

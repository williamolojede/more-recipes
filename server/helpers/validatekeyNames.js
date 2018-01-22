/**
 *
 * @param {*} right
 * @param {*} wrong
 */

const validateKeyNames = (right, wrong) => {
  const rightKeys = Object.keys(right);
  const wrongKeys = Object.keys(wrong);
  // filter for invalid key(s)
  const invalids = wrongKeys.filter(wrongKey => !rightKeys.includes(wrongKey));
  return invalids.length > 0;
};
export default validateKeyNames;

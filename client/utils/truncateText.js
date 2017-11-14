/**
 * Transforms a text string to one of reduced length suffixed with an ellipisis(...)
 * @param {string} originalText
 * @param {number} desiredLength
 * @returns {string} truncated text
 */
const truncateText = (originalText, desiredLength) => {
  if (typeof originalText !== 'string') {
    throw new Error(`${originalText} is not of type 'string'`);
  }
  if (typeof desiredLength !== 'number') throw new Error('desiredLength is not of type \'number\'');
  if (originalText.length < desiredLength) return originalText;
  return `${originalText.slice(0, desiredLength - 3).trim()}...`;
};

export default truncateText;

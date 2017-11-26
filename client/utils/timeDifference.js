import prettyMs from 'pretty-ms';

/**
 * Calculates how long a resource has been created on the server
 * @param {ISOTimeString} timeString
 */

const timeDifference = (timeString) => {
  const currentDate = Date.now();
  const previousDate = Date.parse(timeString);
  const difference = currentDate - previousDate;

  const result = prettyMs(difference, {
    compact: true,
    verbose: true
  });

  if (result.indexOf('~') > -1) {
    return `${result.slice(1)} ago`;
  }

  if (result.indexOf('milliseconds') > -1) {
    return '1 second ago';
  }
};

export default timeDifference;

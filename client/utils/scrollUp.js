/**
 * @param  {string} delayInMs - duration before next call
 * @param  {string} scrollStepInPx - height to move in
 * @return {undefined}
 */
const scrollUp = (delayInMs, scrollStepInPx) => {
  // create interval and assign its id
  const intervalId = setInterval(() => {
    // if at the top of the page clear interval
    if (window.pageYOffset === 0) {
      clearInterval(intervalId);
    }
    window.scroll(0, window.pageYOffset - scrollStepInPx);
  }, delayInMs);
};

export default scrollUp;

/*
Throttle makes sure that there is a minimum amount of time gap (given) between two calls
to your function.
 */
let throttleTimer;

const throttle = (callback, time) => {
  if (throttleTimer) return;
  throttleTimer = true;
  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};

window.addEventListener("scroll", () => {
  throttle(handleScrollAnimation, 250);
});

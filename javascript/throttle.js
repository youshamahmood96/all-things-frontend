export const throttleFunction = (func, delay) => {
  let prev = 0;
  return () => {
    let now = new Date().getTime();
    if (now - prev > delay) {
      prev = now;
      func();
    }
  };
};

/*
In JavaScript, a debounce function makes sure that your code is only triggered once per user input. 
 */
const debounce = (callback, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, timeout);
  };
};
const saveInput = () => {
  console.log("Saving data");
};
const processChanges = debounce(() => saveInput(), 1000);

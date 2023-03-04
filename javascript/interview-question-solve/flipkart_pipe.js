/*
Given an object which can have a function as a value at a nested level, 
create a function that will accept arguments as input and pass it through all the functions in the input object and return the computed value.
*/

const obj = {
  a: {
    b: (a, b, c) => a + b + c,
    c: (a, b, c) => a + b - c,
  },
  d: (a, b, c) => a - b - c,
};

/// SOLUTION

const pipe = (obj) => {
  return (...args) => {
    for (let key in obj) {
      if (typeof obj[key] === "function") {
        obj[key] = obj[key](...args);
      } else {
        obj[key] = pipe(obj[key])(...args);
      }
    }
    return obj;
  };
};

const result = pipe(obj)(1, 1, 1);

console.log(result);

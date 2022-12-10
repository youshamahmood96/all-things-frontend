const test = (a, b, c) => {
  return a + b + c;
};

const curried = curry(test);

curried(1)(2, 3);
curried(1)(2)(3);
curried(1, 2)(3);
curried(1, 2, 3);

const curry = (fn) => {};

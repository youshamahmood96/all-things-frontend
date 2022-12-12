const arr = [1, 2, [3, 4, [5, [7, 8], 6]]];

export const recursiveFlat = (arr, depth = 1) => {
  const res = [];
  const _rec = (arr, depth) => {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && depth > 0) {
        _rec(arr[i], depth - 1);
      } else {
        res.push(arr[i]);
      }
    }
  };
  _rec(arr, depth);
  return res;
};

const reduceFlat = (arr, d = 1) => {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? reduceFlat(val, d - 1) : val),
        []
      )
    : arr;
};

export const flatWithoutPrivateMethod = (arr, depth = 1) => {
  const res = [];
  arr.forEach((el) => {
    if (Array.isArray(el) && depth > 0) {
      res.push(...flatWithoutPrivateMethod(el, depth - 1));
    } else {
      res.push(el);
    }
  });
  return res;
};
// const recursiveMonitor = monitor(recursiveFlat, arr);
// const reduceMonitor = monitor(reduceFlat, arr);
// const nativeFlatMonitor = monitor(Array.prototype.flat, arr);
// console.log(recursiveMonitor);
// console.log(reduceMonitor);
// console.log(nativeFlatMonitor);

// polyfill

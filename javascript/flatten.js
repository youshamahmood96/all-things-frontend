import { monitor } from "./monitor.js";

const arr = [1, 2, [3, 4, [5, [7, 8], 6]]];

export const recursiveFlat = (arr, depth = 1) => {
  const res = [];
  const rec = (arr, depth) => {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && depth > 0) {
        rec(arr[i], depth - 1);
      } else {
        res.push(arr[i]);
      }
    }
  };
  rec(arr, depth);
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
// const recursiveMonitor = monitor(recursiveFlat, arr);
// const reduceMonitor = monitor(reduceFlat, arr);
// const nativeFlatMonitor = monitor(Array.prototype.flat, arr);
// console.log(recursiveMonitor);
// console.log(reduceMonitor);
// console.log(nativeFlatMonitor);

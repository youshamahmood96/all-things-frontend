import { performance } from "perf_hooks";

export const flatten1 = (arr) => {
  const res = [];
  const rec = () => {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        rec(arr[i]);
      } else {
        res.push(arr[i]);
      }
    }
  };
  rec(arr);
  return res;
};
const flatten2 = (arr) => {
  return arr.flat();
};

export const flatten3 = (arr) => arr.reduce((acc, val) => acc.concat(val), []);
// let startRecursion = performance.now();
// console.log(flatten1([1, [2, [3, 4, [6, 7], 5]]]));
// let endRecursion = performance.now();
// console.log(`Recursion took ${endRecursion - startRecursion} milliseconds`);

// let startNativeMethod = performance.now();
// console.log(flatten2([1, [2, [3, 4, [6, 7], 5]]]));
// let endNativeMethod = performance.now();
// console.log(
//   `Native Method took ${endNativeMethod - startNativeMethod} milliseconds`
// );

// let startReduce = performance.now();
// console.log(flatten3([1, [2, [3, 4, [6, 7], 5]]]));
// let endReduce = performance.now();
// console.log(`Reduce took ${endReduce - startReduce} milliseconds`);

import { monitor } from "./monitor.js";

Array.prototype.cflat = function () {
  return this.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? val.cflat() : val),
    []
  );
};

// console.log([1, [2, [3, [4, 5, [6, 7]]]]].cflat());

Array.prototype.cmap = function (callback) {
  let res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(callback(this[i], i, this));
  }
  return res;
};

// [1, 2, 3, 4, 5].cmap((item, index, arr) => {
//   console.log(`${item} has index of ${index} in array : ${arr}`);
// });

Array.prototype.creduce = function (callback, initialValue) {
  let accumulator = initialValue === undefined ? undefined : initialValue;
  for (let i = 0; i < this.length; i++) {
    accumulator =
      accumulator === undefined
        ? this[i]
        : callback(accumulator, this[i], i, this);
  }
  return accumulator;
};

// console.log(
//   [1, 2, 3, 4].creduce(
//     (accumulator, currentValue) => accumulator + currentValue
//   )
// );

Array.prototype.cfilter = function (callback) {
  let flag;
  let res = [];
  for (let i = 0; i < this.length; i++) {
    flag = callback(this[i], i, this);
    if (flag) {
      res.push(this[i]);
    }
  }
  return res;
};

// console.log(
//   ["spray", "limit", "elite", "exuberant", "destruction", "present"].cfilter(
//     (word) => word.length > 6
//   )
// );

Array.prototype.csort = function () {
  let min,
    max,
    z = 0;
  let count = [];
  for (let i = 0; i < this.length; i++) {
    if (min > this[i] || min === undefined) min = this[i];
    if (max < this[i] || max === undefined) max = this[i];
  }
  for (let i = min; i <= max; i++) {
    count[i] = 0;
  }
  for (let i = 0; i < this.length; i++) {
    count[this[i]]++;
  }
  for (let i = min; i <= max; i++) {
    while (count[i]-- > 0) {
      this[z++] = i;
    }
  }
  return this;
};

Array.prototype.mergesort = function () {
  const _merge = (left, right) => {
    const res = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) res.push(left.shift());
      else res.push(right.shift());
    }
    return [...res, ...left, ...right];
  };
  const _recursive = (arr) => {
    if (arr.length < 2) return arr;
    const half = arr.length / 2;
    const left = arr.splice(0, half);
    return _merge(_recursive(left), _recursive(arr));
  };
  return _recursive(this);
};
Array.prototype.customMap = function (callback) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    const curr = callback(this[i], i);
    res.push(curr);
  }
  return res;
};

Array.prototype.customReduce = function (callback, initialValue) {
  let acc;
  if (!initialValue) {
    acc = this[0];
  } else {
    acc = initialValue;
  }
  for (let i = !initialValue ? 1 : 0; i < this.length; i++) {
    acc = callback(acc, this[i]);
  }
  return acc;
};
const arr = [7, 6, 2, 1, 4, 3, 6];
// const nativeSort = () => {
//   return arr.sort((a, b) => a - b);
// };

// const customSort = () => {
//   return arr.csort();
// };
// const mergeSort = () => {
//   return arr.mergesort();
// };
// monitor(nativeSort);
// monitor(customSort);
// console.log(mergeSort());

// console.log(arr.customMap((val, idx) => val + idx));

console.log(arr.customReduce((acc, val) => acc + val, 500));

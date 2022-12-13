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
  const half = this.length / 2;
  const merge = (left, right) => {
    const res = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) res.push(left.shift());
      else res.push(right.shift());
    }
    return [...res, ...left, ...right];
  };
  if (this.length < 2) return this;
  const left = this.splice(0, half);
  return merge(this.mergesort(left), this.mergesort(this));
};
const arr = [7, 6, 2, 1, 4, 3, 6];
const nativeSort = () => {
  return arr.sort((a, b) => a - b);
};

const customSort = () => {
  return arr.csort();
};
const mergeSort = () => {
  return arr.mergesort();
};
monitor(nativeSort);
monitor(customSort);
monitor(mergeSort);
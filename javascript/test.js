const arr = [3, 5, 4, [7, 65, [92, 64, [23]]], 1, 8];

Array.prototype.customFlat = function () {
  return this.reduce((accumulator, currentValue) => {
    return accumulator.concat(
      Array.isArray(currentValue) ? currentValue.customFlat() : currentValue
    );
  }, []);
};

Array.prototype.customSort = function () {
  let min,
    max,
    z = 0;
  for (let i = 0; i < this.length; i++) {
    if (!min || min > this[i]) min = this[i];
    if (!max || max < this[i]) max = this[i];
  }
  let count = [];
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
    while (left.length > 0 && right.length > 0) {
      if (left[0] < right[0]) res.push(left.shift());
      else res.push(right.shift());
    }
    return [...res, ...left, ...right];
  };
  const _mergesort = (arr) => {
    if (arr.length < 2) return arr;
    const half = arr.length / 2;
    const left = arr.splice(0, half);
    return _merge(_mergesort(left), _mergesort(arr));
  };
  return _mergesort(this);
};

Array.prototype.customToString = function () {
  let res = "";
  for (let i = 0; i < this.length; i++) {
    res = res + this[i];
  }
  return res;
};

// console.log(arr.customFlat().mergesort().customToString());

// const flattened = arr.customFlat().customToString();

// console.log(flattened);

// for (let i = 0; i < flattened.length; i++) {
//   console.log(flattened[i]);
// }

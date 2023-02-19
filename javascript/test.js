const arr = [1, 2, [3, 4, [5, 6]]];

const flatten = (arr) => {
  const res = [];
  const _helper = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (Array.isArray(element)) _helper(element);
      else res.push(element);
    }
  };
  _helper(arr);
  return res;
};

console.log(flatten(arr));

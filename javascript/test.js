// This is a JavaScript coding problem from BFE.dev
/**
 * @param { Array } arr
 * @param { number } depth
 * @returns { Array }
 */
function flat(arr, depth = 1) {
  const res = [];
  function _flat(arr, depth) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && depth > 0) {
        _flat(arr[i], depth - 1);
      } else {
        res.push(arr[i]);
      }
    }
  }
  _flat(arr, depth);
  return res;
}

const arr = [1, [2], [3, [4]]];

console.log(flat(arr));
// [1, 2, 3, [4]]

flat(arr, 1);
// [1, 2, 3, [4]]

flat(arr, 2);
// [1, 2, 3, 4]

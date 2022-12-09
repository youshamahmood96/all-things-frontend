import { flatten1, flatten3 } from "./flatten.js";
import sort from "./sort.js";

const arr = [7, 6, 8, 4, [2, 3, 9, [12, 7]]];

const res1 = sort(flatten1(arr));

// const res3 = sort(flatten3(arr));

console.log(res1);
// console.log(res3);

// This is a JavaScript coding problem from BFE.dev
// /**
//  * @param { Array } arr
//  * @param { number } depth
//  * @returns { Array }
//  */
// function flat(arr, depth = 1) {
//   const res = [];
//   function _flat(depth) {
//     for (let i = 0; i < arr.length; i++) {
//       if (Array.isArray(arr[i]) && depth > 1) {
//         _flat(depth - 1);
//       } else {
//         res.push(arr[i]);
//       }
//     }
//   }
//   _flat(depth);
//   return res;
// }

// const arr = [1, [2], [3, [4]]];

// console.log(flat(arr));
// // [1, 2, 3, [4]]

// flat(arr, 1);
// // [1, 2, 3, [4]]

// flat(arr, 2);
// // [1, 2, 3, 4]

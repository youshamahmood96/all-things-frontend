import { recursiveFlat } from "./flatten.js";
import sort from "./sort.js";
import { toString } from "./tostring.js";

const arr = [7, 6, 8, 4, [2, 3, 9, [12, 7]]];

const res1 = sort(recursiveFlat(arr, Infinity));

const res3 = toString(res1);

console.log(res1);
console.log(res3);

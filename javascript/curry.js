function curry(func) {
  function _curry(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function (...next) {
        return _curry(...args, ...next);
      };
    }
  }
  return _curry;
}
function multiply(a, b, c) {
  return a * b * c;
}
let curried = curry(multiply);
console.log(curried(2)(3)(4));
console.log(curried(2, 3)(4));
console.log(curried(2, 3, 4));
console.log(curried(5)(6, 7));

console.log(typeof null); // object
console.log(null instanceof Object); // false
console.log(typeof 1); // number
console.log(1 instanceof Number); // false
console.log(1 instanceof Object); // false
console.log(typeof Number(1)); // number
console.log(new Number(1) instanceof Object); // true
console.log(typeof true); //boolean
console.log(true instanceof Boolean); // false
console.log(true instanceof Object); // false
console.log(Boolean(true) instanceof Object); // false
console.log(new Boolean(true) instanceof Object); //true
console.log([] instanceof Array); // true
console.log([] instanceof Object); // true
console.log((() => {}) instanceof Object); //true

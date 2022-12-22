console.log(0 == "0");
console.log(0 === "0");
console.log(Object.is(0, "0"));

console.log(0 == 0);
console.log(0 === 0);
console.log(Object.is(0, 0));

console.log(0 == -0);
console.log(0 === -0);
console.log(Object.is(0, -0));

console.log(NaN == NaN);
console.log(NaN === NaN);
console.log(Object.is(NaN, NaN));

console.log(0 == false);
console.log(0 === false);
console.log(Object.is(0, false));

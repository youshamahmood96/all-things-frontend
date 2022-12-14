const foo = {};
foo.toString(); // [object Object]

const baz = {
  toString: () => "I'm object baz",
};

console.log(baz + "!"); //

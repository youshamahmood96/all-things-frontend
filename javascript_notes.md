---
puppeteer:
  format: "A4"
---

# {Java+Type}script Notes:

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [{Java+Type}script Notes:](#javatypescript-notes)
  - [Event delegation](#event-delegation)
  - [Event bubbling](#event-bubbling)
    - [event.target vs event.currentTarget:](#eventtarget-vs-eventcurrenttarget)
  - [All things `this`](#all-things-this)
    - [How `this` works in javascript](#how-this-works-in-javascript)
    - [Random trivia](#random-trivia)
    - [`this` in IIFE](#this-in-iife)
  - [Prototypal vs Classical Inheritance](#prototypal-vs-classical-inheritance)
  - [`null` vs `undefined` vs undeclared](#null-vs-undefined-vs-undeclared)
  - [Closure](#closure)
  - [Object Literals](#object-literals)
  - [Module Pattern](#module-pattern)
  - [Currying,arity and partial application](#curryingarity-and-partial-application)
  - [Arrow function implicit return](#arrow-function-implicit-return)
  - [call apply and bind](#call-apply-and-bind)
  - [Famous `setTimeout` problem](#famous-settimeout-problem)
  - [Spread operator](#spread-operator)
  - [All things array](#all-things-array)
    - [Array reduce trivia](#array-reduce-trivia)
    - [Getting nth item from an array in a nested object](#getting-nth-item-from-an-array-in-a-nested-object)
    - [Difference between `push` and `concat`](#difference-between-push-and-concat)
    - [Empty items in array](#empty-items-in-array)
    - [Modifying `array.length` property](#modifying-arraylength-property)
  - [Asynchronous callbacks](#asynchronous-callbacks)
  - [async await promises](#async-await-promises)
  - [Interface vs Types](#interface-vs-types)
  - [Prototypes vs classes](#prototypes-vs-classes)
  - [Implements vs Extends](#implements-vs-extends)
  - [Generics](#generics)
  - [Arrow Functions vs Regular Functions](#arrow-functions-vs-regular-functions)
  - [Promises](#promises)
  - [Scoping](#scoping)
  - [Using operators on string](#using-operators-on-string)
  - [Javascript falsy values](#javascript-falsy-values)
  - [Demistifying `null`](#demistifying-null)
  - [Equality operator behaviors](#equality-operator-behaviors)
  - [Implicit coercion](#implicit-coercion)
    - [String](#string)
      - [Case for `+` operator](#case-for--operator)
    - [Object](#object)
    - [Array Object](#array-object)
    - [True, False and ""](#true-false-and-)
  - [Operator precedence](#operator-precedence)
  - [Types...](#types)
    - [`null` is not an `Object`](#null-is-not-an-object)
    - [`Number` object vs `number` primitive](#number-object-vs-number-primitive)
    - [Calling new Number() is not the same as calling Number()](#calling-new-number-is-not-the-same-as-calling-number)
  - [Weird parseInt()](#weird-parseint)
  - [Promise Executor](#promise-executor)
  - [Javascript optimization](#javascript-optimization)
  - [Pass by value vs pass by reference](#pass-by-value-vs-pass-by-reference)

<!-- /code_chunk_output -->

## Event delegation

It is the process which uses event bubbling and allows us to bind a single event handler to the parent component and that handler will be available in all child components.

## Event bubbling

It is literally what bubbling means, all the events from children will bubble to their parents.

### event.target vs event.currentTarget:

```html
<form onclick="alert('form')">
  FORM
  <div onclick="alert('div')">
    DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```

In `form.onclick` handler:

- `event.currentTarget` is the `<form>` element.
- `event.target` is the actual element inside the form that was clicked.

## All things `this`

### How `this` works in javascript

refer to [this medium article](https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/).
solve [these 7 questions](https://dmitripavlutin.com/javascript-this-interview-questions/)

- If `new` keyword is used while calling the function, `this` will be a brand new object. An example with a constructor funtion is shown below:

```javascript
function ConstructorFunction() {
  console.log(this);
  this.value = "hello";
  console.log(this);
}
new ConstructorFunction();
// --> logs {}
// --> logs { value: 'hello' }
```

- If `call` , `apply` or `bind` is used, `this` will be the object passed as the first argument to `call`, `apply` or `bind`.

```javascript
function example() {
  console.log(this);
}
example.call({ value: "hello" });
// --> logs { value: 'hello' }
```

- If a function is called as a method of an object, `this` will be the object the method is called on.

```javascript
const obj = {
  value: "hello",
  example: function () {
    console.log(this);
  },
};
obj.example();
// --> logs { value: 'hello', example: [Function: example] }
```

- If a function is invoked as a free function, `this` is the global object, in browser,it is `window`

  ```javascript
  function example() {
    console.log(this);
  }
  example();
  // --> logs window
  ```

### Random trivia

```js
length = 10;
function func() {
  console.log(this.length);
}

var obj = {
  length: 5,
  thisFunc: function (func) {
    func();
    arguments[0]();
  },
};

obj.thisFunc(func, 3);
```

Why does this print 10 and 2?

Ok we know how it shows 10, lets come to 2.

```javascript
arguments[0]();
```

here, `arguments` array has 2 elements, `func` and `3`. So `arguments[0]` is `func`. when `argumentrs[0]()` is written, it just means that hey, take the `arguments` array, pick off the first element, and call it, whatever it is.
Doing this, the parent of the first element becomes the `arguments` array, and not the `obj` object. So `this` becomes `arguments` array, and `this.length` becomes `2`.

### `this` in IIFE

Consider the following example:

```js
var a = {};
var b = {};
a.hello = function () {
  console.log(this);
};
b.hello = a.hello;
```

In most programming languages, b.hello() would print `a` since they base `this` on where the function is. The function is inside `a`, so `this` is `a`. Makes sense, right?

However, JavaScript is a bit different in that regard. Instead of where it is, it's based on how it was called. b.hello() calls hello on `b`, thus `this` is set to `b`. This also makes sense since JavaScript doesn't really have a concept of "where" a function is (unlike methods in, say, Java, which are always tied to a specific class), and it's hard to determine that `a` is where it is.

So, foo.bar() will always set `this` to `foo` for the purposes of `this` call to `bar` (unless one has used bind or similar to bind this to a specific value in advance).

Now, an IIFE is invoked on... nothing, really. It's not a foo.bar() situation, it's just a bar() where bar is your function expression. In cases like this where there's no foo, it defaults to the window object.

There are two simple workarounds:

1. Create a variable outside the IIFE containing the value you´re interested in: var that = this; and use that instead of this in the IIFE, or
2. Bind the `this` value:

```js
(function(){ CODE GOES HERE }).bind(this)();
```

**NOTE:** `call(), apply(), bind()` doesnt work on `IIFE`

## Prototypal vs Classical Inheritance

refer to [this answer on stackoverflow](https://stackoverflow.com/questions/19633762/classical-inheritance-vs-prototypal-inheritance-in-javascript#:~:text=Classical%20inheritance%20is%20limited%20to,also%20objects%20inheriting%20from%20prototypes.).

tldr:Classical inheritance is limited to classes inheriting from other classes. However prototypal inheritance includes not only prototypes inheriting from other prototypes but also objects inheriting from prototypes.

refer to [this paragraph from Kyle Simpson](https://www.quora.com/What-is-prototypal-inheritance/answer/Kyle-Simpson)

In short, javascript `prototypal inheritance` is not `inheritance` in its default meaning (from OOP languages). It is more like `delegation` or `composition`.

`EDUCATIVE CHALLENGE:`

```javascript
function Human(name, age) {
  this.name = name;
  this.age = age;
}

function Man() {}

function checker() {
  const man = new Man("Yousha");
  console.log(man.name);
  console.log(man instanceof Human);
}
```

Create `prototypal inheritance` from `Human` to `Man` so that, `checker` function logs `Yousha` and `true`.

## `null` vs `undefined` vs undeclared

- `null` is an assignment value. It can be assigned to a variable as a representation of no value.
- `undefined` is a type itself (undefined) that means a variable has been declared but not defined yet.

both of them needs to be checked with `===` operator.

- `undeclared` is a variable that has not been declared at all. It will throw an error in `strict mode` if you try to access it.

## Closure

A closure is the combination of a function and the lexical environment within which that function was declared.
And it can remember its lexical scope even when it is executed outside that lexical scope.

## Object Literals

In object literal notation, an object is described as a set of comma-separated name/value pairs enclosed in curly braces ({}). Names inside the object may be either strings or identifiers that are followed by a colon. There should be no comma used after the final name/value pair in the object as this may result in errors.

```js
const person = {
  name: "John",
  age: 30,
  greet: function () {
    console.log("Hello, my name is " + this.name);
  },
};
```

## Module Pattern

The module pattern is a design pattern that is used to encapsulate private methods and variables, which can only be accessed publicly through a privileged public method.

```js
let counter = 0;

const testModule = {
  incrementCounter() {
    return counter++;
  },
  resetCounter() {
    console.log(`counter value prior to reset: ${counter}`);
    counter = 0;
  },
};

// Default export module, without name
export default testModule;

// Usage:

// Import module from path
import testModule from "./testModule";

// Increment our counter
testModule.incrementCounter();

// Check the counter value and reset
// Outputs: counter value prior to reset: 1
testModule.resetCounter();
```

Here module pattern is using closure to encapsulate private variables and methods.

[See weakmap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

## Currying,arity and partial application

The arity of a function is the number of arguments it requires. Currying a function means to convert a function of N arity into N functions of arity 1.

## Arrow function implicit return

```js
const add = (a, b) => a + b;
```

## call apply and bind

- `.call()` and `.apply()` are used to invoke a function with a given `this` value and arguments provided individually.
- for `.call` , you need to pass comma seperated arguments
- for `.apply` , you need to pass an array of arguments
- `.bind` creates a new function from an existing function with a given `this` value and arguments provided individually. Basically the `this` of new function will now point to the `this` of the function it was created from.

## Famous `setTimeout` problem

```js
const array = [5, 11, 18, 25];
for (var i = 0; i < array.length; i++) {
  setTimeout(function () {
    console.log("Element: " + array[i] + ", at index: " + i);
  }, 3000);
}
```

Result:Index out of range

```js
const array = [5, 11, 18, 25];
for (var i = 0; i < array.length; i++) {
  setTimeout(
    (function (local_i) {
      return function () {
        console.log("Element: " + array[local_i] + ", at index: " + local_i);
      };
    })(i),
    3000
  );
}
```

Result: accurate!

## Spread operator

If we copy something with spread operator, a new ref is created and the previous object is not affected.

```js
const employee = { name: "Emily", job: "Developer" };
const copyEmployee = { ...employee };
console.log("Displaying employee");
console.log(employee);
console.log("Displaying copyEmployee");
console.log(copyEmployee);

//now let change the property values of copyEmployee
copyEmployee.name = "Anne";
copyEmployee.job = "Architect";
console.log("Displaying updated copyEmployee");
console.log(copyEmployee);
console.log("Displaying employee");
console.log(employee);
```

## All things array

### Array reduce trivia

```js
[1, 2, 3].reduce((a, b) => {
  console.log(a, b);
});
/* The above snippet prints:
1 2
undefined 3
 */
[1, 2, 3].reduce((a, b) => {
  console.log(a, b);
}, 0);

/* The above snippet prints:
0 1
undefined 2
undefined 3
 */
```

**Note:** If an accumulator value is given, it is used as the initial value of the accumulator, and the array traversing will start from `index 0`. If no accumulator value is given, the first element in the array will be used as the initial value of the accumulator and array traversing will start from `index 1` . Calling reduce() on an empty array without an initial value will throw a TypeError.

### Getting nth item from an array in a nested object

```js
function returnNthCat(n) {
  const state = {
    cats: [
      { catId: 1, name: "tom" },
      { catId: 2, name: "tiggy" },
      { catId: 3, name: "leo" },
      { catId: 4, name: "tommy" },
    ],
    curpage: 3,
  };

  const {
    cats: {
      [n]: { name: thisCatName },
    },
  } = state;

  return thisCatName;
}
```

### Difference between `push` and `concat`

`push` mutates the original array and return the length of the new array, `concat` returns a new array with the concated element.

### Empty items in array

```js
const arr = [0];
arr[3] = 3;
console.log(arr); // [0, <2 empty items>, 3]

for (let item of arr) {
  console.log(item); // 0, undefined, undefined, 3
}
arr.map((item) => console.log(item)); // 0,3
```

This happens because `array.map()` doesnt run its callback function on empty items.

Same goes for `array.forEach()`

### Modifying `array.length` property

If we modify the `array.length` property, it will actually change the length of the array and make the rest of the items `undefined`

## Asynchronous callbacks

This will print `undefined`

```js
const getTodo = () => {
  setTimeout(() => {
    return { text: "Complete Code Example" };
  }, 2000);
};
function display() {
  const todo = getTodo();
  console.log(todo.text);
}
display();
```

WHY THOUGH?

Because `setTimeout` is an asynchronous function, it will not block the execution of the code. So the `display` function will be executed before the `setTimeout` function. So the `todo` variable will be undefined.

Fix:

```js
const getTodo = (callback) => {
  setTimeout(() => {
    callback({ text: "Complete Code Example" });
  }, 2000);
};
function display() {
  getTodo((todo) => {
    console.log(todo.text);
  });
}
display();
```

an alternative fix:

```js
const getTodo = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ text: "Complete Code Example" });
    }, 2000);
  });
};
async function display() {
  const todo = await getTodo();
  console.log(todo.text);
}
```

## async await promises

NOTE: Any function having `async` keyword is a promise.

```js
async function display() {
  return 10;
}
const result = display();
console.log(result); // Promise { 10 }
const result = await display();
console.log(result); // 10
```

## Interface vs Types

- Unlike an interface, the type alias can also be used for other types such as primitives, unions, and tuples.

```ts
// primitive
type Name = string;

// object
type PartialPointX = { x: number };
type PartialPointY = { y: number };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];
```

- A class can implement an interface or type alias, both in the same exact way. Note however that a class and interface are considered static blueprints. Therefore, they can not implement / extend a type alias that names a union type.

```ts
2019 Update
The current answers and the official documentation are outdated. And for those new to TypeScript, the terminology used isn't clear without examples. Below is a list of up-to-date differences.

1. Objects / Functions
Both can be used to describe the shape of an object or a function signature. But the syntax differs.

Interface

interface Point {
  x: number;
  y: number;
}

interface SetPoint {
  (x: number, y: number): void;
}
Type alias

type Point = {
  x: number;
  y: number;
};

type SetPoint = (x: number, y: number) => void;
2. Other Types
Unlike an interface, the type alias can also be used for other types such as primitives, unions, and tuples.

// primitive
type Name = string;

// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];
3. Extend
Both can be extended, but again, the syntax differs. Additionally, note that an interface and type alias are not mutually exclusive. An interface can extend a type alias, and vice versa.

Interface extends interface

interface PartialPointX { x: number; }
interface Point extends PartialPointX { y: number; }
Type alias extends type alias

type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };
Interface extends type alias

type PartialPointX = { x: number; };
interface Point extends PartialPointX { y: number; }
Type alias extends interface

interface PartialPointX { x: number; }
type Point = PartialPointX & { y: number; };
4. Implements
A class can implement an interface or type alias, both in the same exact way. Note however that a class and interface are considered static blueprints. Therefore, they can not implement / extend a type alias that names a union type.

interface Point {
  x: number;
  y: number;
}

class SomePoint implements Point {
  x = 1;
  y = 2;
}

type Point2 = {
  x: number;
  y: number;
};

class SomePoint2 implements Point2 {
  x = 1;
  y = 2;
}

type PartialPoint = { x: number; } | { y: number; };

// FIXME: can not implement a union type
class SomePartialPoint implements PartialPoint {
  x = 1;
  y = 2;
}
```

- Unlike a type alias, an interface can be defined multiple times, and will be treated as a single interface (with members of all declarations being merged).

```ts
interface Point {
  x: number;
}
interface Point {
  y: number;
}

const point: Point = { x: 1, y: 2 };
```

## Prototypes vs classes

The most important difference between class- and prototype-based inheritance is that a class defines a type which can be instantiated at runtime, whereas a prototype is itself an object instance.

A child of an ES6 class is another type definition which extends the parent with new properties and methods, which in turn can be instantiated at runtime. A child of a prototype is another object instance which delegates to the parent any properties that aren’t implemented on the child.

Side note: You might be wondering why I mentioned class methods, but not prototype methods. That’s because JavaScript doesn’t have a concept of methods. Functions are first-class in JavaScript, and they can have properties or be properties of other objects.

To put a really fine point on that, a child of a prototype isn’t a copy of its prototype, nor is it an object with the same shape as its prototype. The child has a living reference to the prototype, and any prototype property that doesn’t exist on the child is a one-way reference to a property of the same name on the prototype.

```js
let parent = { foo: "foo" };
let child = {};
Object.setPrototypeOf(child, parent);

console.log(child.foo); // 'foo'

child.foo = "bar";

console.log(child.foo); // 'bar'

console.log(parent.foo); // 'foo'

delete child.foo;

console.log(child.foo); // 'foo'

parent.foo = "baz";

console.log(child.foo); // 'baz'
```

## Implements vs Extends

**extends** means :

**The new class is a child**. It gets benefits coming with inheritance. It has all the properties and methods of its parent. It can override some of these and implement new ones, but the parent stuff is already included.

**implements** means :

**The new class** can be treated as the **same shape**, but it is not a child.

When we override properties with `extends` , they are overridden permanently, whereas the method override saves a reference to the parent class.

## Generics

Way of static typing the dynamic types.

```ts
function identity<T>(arg: T): T {
  return arg;
}
identity<string>("myString"); // type of output will be 'string'
```

## Arrow Functions vs Regular Functions

[refer to this article](https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/#1-this-value)

## Promises

- Always `return` from `.then()` to maintain the chain, otherwise the next `.then()` will be called with `undefined` as the value.

```js
Promise.resolve(1)
  .then((val) => {
    // val = 1
    console.log(val); // LOGS 1
    return val + 1; // return 2
  })
  .then((val) => {
    // val = 2
    console.log(val); // LOGS 2
  })
  .then((val) => {
    console.log(val); // LOGS undefined
  });
```

- You can only pass functions as a parameter to `Promise.resolve.then`

```js
Promise.resolve(1) // 1 inside a promise object
  .then(() => 2) // 2 is returned without reading 1, so now console.log will print 2
  .then(3) // will throw error, as we cannot pass an integer to a .then()
  .then((value) => value * 3) // here, the value is still 2, as the previous .then() threw an error
  .then(Promise.resolve(4)) // creates a pending promise
  .then(console.log); // logs 6
```

- `promise.prototype.finally` doesnt accept any arguments

```js
// This is a JavaScript Quiz from BFE.dev

Promise.resolve(1)
  .then((val) => {
    // val = 1
    console.log(val); // LOGS 1
    return val + 1; // 2
  })

  .finally((val) => {
    console.log(val); // undefined
    return 10;
  });
```

## Scoping

```js
const obj = {
  dev: "bfe",
  a: function () {
    return this.dev;
  },
  b() {
    return this.dev;
  },
  c: () => {
    return this.dev;
  },
  d: function () {
    return (() => {
      return this.dev;
    })();
  },
  e: function () {
    return this.b();
  },
  f: function () {
    return this.b;
  },
  g: function () {
    return this.c();
  },
  h: function () {
    return this.c;
  },
  i: function () {
    return () => {
      return this.dev;
    };
  },
};

console.log(obj.a()); // bfe
console.log(obj.b()); // bfe
console.log(obj.c()); // TypeError
console.log(obj.d()); // bfe
console.log(obj.e()); // bfe
console.log(obj.f()()); // TypeError
console.log(obj.g()); // TypeError
console.log(obj.h()()); // TypeError
console.log(obj.i()()); // bfe
```

## Using operators on string

```js
console.log("3" + 1); // 31
console.log("3" - 1); // 2
```

In the first example, `+` operator is used to concatenate the string and number. In the second example, `-` operator is used to subtract the number from the string, which javascript does by converting the string to a number.

## Javascript falsy values

A falsy (sometimes written falsey) value is a value that is considered false when encountered in a Boolean context.

JavaScript uses type conversion to coerce any value to a Boolean in contexts that require it, such as conditionals and loops.

javascript falsy values are:
∏

- false
- 0
- -0
- 0n
- "", '', ``
- null
- undefined
- NaN
- document.all

## Demistifying `null`

main question is, why

```js
null >= 0; // true
```

but:

```js
null == 0; // false
```

What really happens is, relational (i.e `>=`) operators use type coercion (`toPrimitive`) with a hint type of Number, actually all the relational operators have this behavior.

**Note:** Equality operators will convert anything that is empty to 0. (i.e `'',[]` etc)

But `==` operator, coerces `null` to `undefined`

```js
null == null; // true
null == undefined; // true
```

## Equality operator behaviors

```js
console.log(0 == false); // true
console.log("" == false); // true
console.log([] == false); //true
console.log(undefined == false); //false
console.log(null == false); // false
console.log("1" == true); // true
console.log(1n == true); // true
console.log(" 1     " == true); //true
```

## Implicit coercion

#### String

Whenever you pass a string as an operand in a numeric expression involving either of these operators: `-, \*, /, %,` the number's conversion process is similar to calling the in-built Number function on the value. This is pretty straightforward, any string containing only numeric characters will be converted to it's number equivalent, but a string containing a non-numeric character returns NaN. Illustrated below,

```js
3 * "3"; // 3 * 3
3 * Number("3"); // 3 * 3
Number("5"); // 5

Number("1."); // 1
Number("1.34"); // 1.34
Number("0"); // 0
Number("012"); // 12

Number("1,"); // NaN
Number("1+1"); // NaN
Number("1a"); // NaN
Number("one"); // NaN
Number("text"); // NaN
```

##### Case for `+` operator

The + operator unlike other mathematical operators, performs two functions:

1. Mathematical addition
2. String concatenation

When a string is an operand of the + operator, Javascript instead of converting the string to a Number, converts the number to a string.

```js
// concatenation
1 + "2"; // "12"
1 + "js"; // "1js"

// addition
1 + 2; // 3
1 + 2 + 1; // 4

//addition, then concatenation
1 + 2 + "1"; // "31"
1 + 2 + "1"; // "31"

//concatenation all through
1 + "2" + 1; // "121"
1 + "2" + 1; // "121"
```

#### Object

Most Javascript Object conversions usually result in [object Object], For example

```js
"name" + {}; // "name[object Object]
```

Javascript objects run `toString()` method in mathematical expressions.

Every javascript Object inherits a toString method, that is called whenever an Object is to be converted to a string. The return value of the toString method is used for such operations as string concatenation and mathematical expressions.

#### Array Object

The inherited `toString` method of Arrays work abit differently, it works in a way similar to calling the `join` method of an array without any arguments.

#### True, False and ""

```js
Number(true); // 1
Number(false); // 0
Number(""); // 0

4 + true; // 5
3 * false; // 0
3 * ""; // 0
3 + ""; // "3"
```

## Operator precedence

```js
console.log((0 == 1) == 2); // false
console.log((2 == 1) == 0); // true
console.log(0 < 1 < 2); // true
console.log(1 < 2 < 3); //true
console.log(2 > 1 > 0); // true
console.log(3 > 2 > 1); // false
```

## Types...

```js
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
```

### `null` is not an `Object`

`null` is not an `Object`. Although `typeof null` returns `object`, it is a bug in javascript.

``

### `Number` object vs `number` primitive

`Number` is a javascript object containing a few usefule methods such as `toFixed()` , `valueOf()` etc., and `number` is a primitive type.

### Calling new Number() is not the same as calling Number()

`Number()` is a function that converts a value to a number, while `new Number()` is a constructor that creates a Number object.

```js
const test = new Number(1);
console.log(typeof test); // object
console.log(typeof Number(1)); // number
```

## Weird parseInt()

```js
console.log(["0"].map(parseInt)); // [0]
console.log(["0", "1"].map(parseInt)); // [0,NaN]
console.log(["0", "1", "1"].map(parseInt)); // [0,NaN,1]
console.log(["0", "1", "1", "1"].map(parseInt)); // [0,NaN,1,1]
```

This unexpected behavior happens because `parseInt` takes two arguments, the first is the value to be parsed, and the second is the radix (i.e the base of the number in the string). The `map` function passes the value, index, and array as arguments to the callback function. Since the `parseInt` function only takes two arguments, the index is passed as the radix.

So, for the first element, the radix is 0, which means that the radix is auto-detected. For the second element, the radix is 1, which is not a valid radix, so `NaN` is returned. For the third and fourth element, the radix is 2,3, which are valid radixes, so the values are parsed correctly.

**Note:** Valid radixes are ranged from 2 to 36.

## Promise Executor

```js
const p1 = Promise.resolve(1);
const p2 = new Promise((resolve) => resolve(p1));
const p3 = Promise.resolve(p1);
const p4 = p2.then(() => new Promise((resolve) => resolve(p3)));
const p5 = p4.then(() => p4);

console.log(p1 == p2); // false
console.log(p1 == p3); // true
console.log(p3 == p4); // false
console.log(p4 == p5); // false
```

## Javascript optimization

[Check out this link for optimization killers](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments)

## Pass by value vs pass by reference

[refer to this link](https://levelup.gitconnected.com/pass-by-value-vs-pass-by-reference-in-javascript-82fa8736c9f7)

\_tldr: The difference between pass-by-reference and pass-by-value is, pass-by-value creates a new space in memory and makes a copy of a value, whereas pass-by-reference does not. Instead of making a copy, pass-by-reference does exactly what it sounds like; a value stored in memory gets referenced.

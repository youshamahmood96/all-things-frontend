---
puppeteer:
  format: "A4"
---

# Front-end interview preparation:

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Front-end interview preparation:](#front-end-interview-preparation)
  - [Event delegation](#event-delegation)
  - [Event bubbling](#event-bubbling)
    - [event.target vs event.currentTarget:](#eventtarget-vs-eventcurrenttarget)
  - [How `this` works in javascript](#how-this-works-in-javascript)
  - [Prototypal Inheritance](#prototypal-inheritance)
  - [`null` vs `undefined` vs undeclared](#null-vs-undefined-vs-undeclared)
  - [Closure](#closure)
  - [Object Literals](#object-literals)
  - [Module Pattern](#module-pattern)
  - [Currying,arity and partial application](#curryingarity-and-partial-application)
  - [Arrow function implicit return](#arrow-function-implicit-return)
  - [call apply and bind](#call-apply-and-bind)
  - [Famous `setTimeout` problem](#famous-settimeout-problem)
  - [Spread operator](#spread-operator)
  - [Array destrucutre tricks](#array-destrucutre-tricks)
    - [Getting nth item from a nested array](#getting-nth-item-from-a-nested-array)
  - [Asynchronous callbacks](#asynchronous-callbacks)
  - [async await promises](#async-await-promises)
  - [Confusions](#confusions)
    - [About `this`](#about-this)

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

## How `this` works in javascript

refer to [this medium article](https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3).

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

## Prototypal Inheritance

refer to [this paragraph from Kyle Simpson](https://www.quora.com/What-is-prototypal-inheritance/answer/Kyle-Simpson)

In short, javascript `prototypal inheritance` is not `inheritance` in its default meaning (from OOP languages). It is more like `delegation` or `composition`.

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

## Array destrucutre tricks

### Getting nth item from a nested array

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

## Confusions

### About `this`

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

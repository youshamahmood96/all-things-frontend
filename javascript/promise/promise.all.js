/*
Promise.all takes an array of promises, sorry, not just array basically anything iterable and returns a single promise. This returned promise is
fulfilled when all of the input's promises fulfill(including when an empty iterable is passed), with an array of fulfillment values.
 */

Promise.customAll = function (promises) {
  return new Promise((resolve, reject) => {
    const result = [];
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        (res) => {
          result[i] = res;
          if (i === promises.length - 1) resolve(result);
        },
        (err) => reject(err)
      );
    }
  });
};
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 100);
});

const newPromise = Promise.customAll([promise1, promise2, promise3]).then(
  (values) => {
    console.log(values);
  }
);

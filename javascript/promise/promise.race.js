Promise.customRace = function (promises) {
  return new Promise((resolve, reject) => {
    for (let promise of promises) {
      Promise.resolve(promise).then(
        (res) => resolve(res),
        (err) => reject(err)
      );
    }
  });
};

const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});
const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});
Promise.race([promise1, promise2]).then(
  (value) => {
    console.log(value);
    // Both resolve, but promise2 is faster
  },
  (err) => console.log(err)
);

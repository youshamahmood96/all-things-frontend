class Promise {
  constructor(handler) {
    this.value = null;
    this.status = "pending";
    this.onResolvedPromise = [];
    this.onRejectedPromise = [];

    const resolve = (value) => {
      if (this.status === "pending") {
        this.status = "resolved";
        this.value = value;
        this.onResolvedPromise.forEach((fn) => fn(value));
      }
    };
    const reject = (value) => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.value = value;
        this.onRejectedPromise.forEach((fn) => fn(value));
      }
    };
    try {
      handler(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onResolved, onRejected) {
    if (this.status === "pending") {
      this.onResolvedPromise.push(onResolved);
      this.onRejectedPromise.push(onRejected);
    }
    if (this.status === "resolved") {
      onResolved(this.value);
    }
    if (this.status === "rejected") {
      onRejected(this.value);
    }
  }
}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("resolved!");
  }, 1000);
});
const p2 = new Promise((resolve, reject) => {
  reject("rejected!");
});
p1.then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);
p2.then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);

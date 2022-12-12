class CustomPromise {
  _status = {
    pending: "pending",
    resolved: "resolved",
    rejected: "rejected",
  };
  constructor(handler) {
    this.value = null;
    this.status = this._status.pending;
    this.onResolvedPromises = [];
    this.onRejectedPromises = [];
    try {
      handler(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  resolve = (value) => {
    if (this.status === this._status.pending) {
      this.status = this._status.resolved;
      this.value = value;
      this.onResolvedPromises.forEach((fn) => fn(value));
    }
  };
  reject = (value) => {
    if (this.status === this._status.pending) {
      this.status = this._status.rejected;
      this.value = value;
      this.onRejectedPromises.forEach((fn) => fn(value));
    }
  };
  then = (onResolve, onReject) => {
    if (this.status === this._status.pending) {
      this.onResolvedPromises.push(onResolve);
      this.onRejectedPromises.push(onReject);
    }
    if (this.status === this._status.resolved) onResolve(this.value);
    if (this.status === this._status.rejected) onReject(this.value);
  };
}
const p1 = new CustomPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("resolved!");
  }, 1000);
});
const p2 = new CustomPromise((resolve, reject) => {
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

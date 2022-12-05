function fn() {
  console.log(this);
  this.hello = 6;
}
var obj = {
  value: 5,
};
var boundFn = fn.bind(obj);
boundFn();

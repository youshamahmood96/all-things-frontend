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

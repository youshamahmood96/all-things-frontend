function Human(name, age) {
  this.name = name;
  this.age = age;
}

function Man(name, age) {
  Human.call(this, name, age);
}

Man.prototype = Object.create(Human.prototype);
// Man.prototype.constructor = Man;

function check() {
  var obj = new Man("Tommy Tan", 20);
  console.log(obj.name);
  console.log(obj instanceof Human);
}
check();

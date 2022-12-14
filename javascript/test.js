const arr = [3, 5, 4, [7, 65, [92, 64, [23]]], 1, 8];

Array.prototype.customFlat = function () {
  return this.reduce((accumulator, currentValue) => {
    return accumulator.concat(
      Array.isArray(currentValue) ? currentValue.customFlat() : currentValue
    );
  }, []);
};

console.log(arr.customFlat());

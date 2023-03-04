const obj = {
  a: 1,
  b: {
    c: "Hello World",
    d: 2,
    e: {
      f: {
        g: -4,
      },
    },
    h: "Good Night Moon",
  },
};

const filter = (s) => typeof s === "string";

const filterNested = (obj, func) => {
  for (let key in obj) {
    const val = obj[key];
    if (typeof val === "object") {
      filterNested(val, func);
    } else {
      if (!func(val)) {
        delete obj[key];
      }
    }
    if (JSON.stringify(val) === "{}") {
      delete obj[key];
    }
  }
  return obj;
};

const res = filterNested(obj, filter);
console.log(res);

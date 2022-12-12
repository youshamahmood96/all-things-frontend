import { performance } from "perf_hooks";

export const monitor = (fn) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${fn.name} took ${end - start} miliseconds`);
};

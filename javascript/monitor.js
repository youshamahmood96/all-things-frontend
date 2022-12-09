import { performance } from "perf_hooks";

export const monitor = (fn, arg) => {
  const start = performance.now();
  fn(arg);
  const end = performance.now();
  return `${fn.name} took ${end - start} miliseconds`;
};

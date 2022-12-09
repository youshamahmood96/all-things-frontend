// COUNTING SORT

const sort = (arr) => {
  let min,
    max,
    count = [],
    z = 0;

  for (let i = 0; i < arr.length; i++) {
    if (!min || min > arr[i]) min = arr[i];
    if (!max || max < arr[i]) max = arr[i];
  }
  for (let i = min; i <= max; i++) {
    count[i] = 0;
  }
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
  }
  for (let i = min; i <= max; i++) {
    while (count[i]-- > 0) {
      arr[z++] = i;
    }
  }
  return arr;
};
export default sort;

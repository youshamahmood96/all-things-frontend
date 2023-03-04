const retry = (asyncFn, retries, delay, finalError) => {
  console.log(asyncFn);
  for (let i = 0; i < retries.length; i++) {
    setInterval(() => {
      if (engine(asyncFn) === "failed") {
        console.log(`attempt ${i + 1} failed`);
      }
    }, delay);
  }
  return finalError;
};

const engine = async (promise) => {
  try {
    await promise();
  } catch (error) {
    return "failed";
  }
};

const asyncFn = () => {
  return new Promise((resolve, reject) => {
    return reject();
  });
};

retry(asyncFn, 3, 50, "Failed");

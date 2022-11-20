const getTodo = (cb) => {
  setTimeout(() => {
    cb({ text: "Complete Code Example" });
  }, 2000);
};
function display() {
  const todo = getTodo((cb) => {
    console.log(cb.text);
  });
}
display();

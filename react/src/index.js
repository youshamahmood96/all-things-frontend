import React from "react";
import ReactDOM from "react-dom";
import Hello from "./Hello";
import MadeUseStateMyself from "./Hooks/useState/MadeUseStateMyself";

ReactDOM.render(
  <React.StrictMode>
    <Hello />
  </React.StrictMode>,
  // <React.StrictMode>
  //   <App/>
  // </React.StrictMode>,
  document.getElementById("root")
);

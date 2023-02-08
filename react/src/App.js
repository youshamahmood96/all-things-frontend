import React, { useState } from "react";
import Hello from "./Hello";
import HookUseCallBack from "./Hooks/useCallBack/HookUseCallBack";
import HookUseMemo from "./Hooks/useMemo/HookUseMemo";
// import MadeUseStateMyself from "./Hooks/useState/MadeUseStateMyself"

const App = () => {
  // const [state, setState] = useState(0);
  // const handleAdd = () => {
  //   if (state < 9) {
  //     setState(state + 1);
  //   }
  // };
  // const handleSubStract = () => {
  //   if (state > 0) {
  //     setState(state - 1);
  //   }
  // };
  return (
    <React.Fragment>
      <Hello />
    </React.Fragment>
  );
};

export default App;

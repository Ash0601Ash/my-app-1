import React, { useState } from "react";

export const Stack = () => {
  const [stack, setStack] = useState([]);

  const popHandler = () => {
    setStack(stack.slice(0, -1));
  };

  const pushHandler = () => {
    const newStack = Math.floor(Math.random() * 100);
    setStack([...stack, newStack]);
  };

  return (
    <>
      <div>
        <button onClick={pushHandler}> Push </button>

        <button onClick={popHandler} disabled={stack.length === 0}>
          Pop
        </button>
        <p>Current Stack: {JSON.stringify(stack)}</p>
      </div>
    </>
  );
};

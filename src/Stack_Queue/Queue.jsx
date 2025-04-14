import React, { useState } from "react";

export const Queue = () => {
  const [queue, setQueue] = useState([]);

  const pushHandler = () => {
    const newQueue = Math.floor(Math.random() * 100);
    setQueue([...queue, newQueue]);
  };

  const popHandler = () => {
    setQueue(queue.slice(1));
  };

  return (
    <div>
      <button onClick={pushHandler}>Push</button>
      <button onClick={popHandler} disabled={queue.length === 0}>
        Pop
      </button>
      <p>Current Queued: {JSON.stringify(queue)}</p>
    </div>
  );
};

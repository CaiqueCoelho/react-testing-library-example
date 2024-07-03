import React from 'react';
import { useState } from 'react';

export default function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  const switchSigns = () => {
    setCount(count * -1);
  };

  return (
    <div>
      <div>
        <h1>Count:</h1>
        <h3 data-testid='count'>{count}</h3>
      </div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
      <button onClick={switchSigns}>Switch Signs</button>
    </div>
  );
}

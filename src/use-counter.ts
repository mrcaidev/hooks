import { useState } from "react";

/**
 * Use a counter.
 */
export function useCounter(initialCount = 0) {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount((count) => count + 1);
  const decrement = () => setCount((count) => count - 1);
  const incrementBy = (delta: number) => setCount((count) => count + delta);
  const decrementBy = (delta: number) => setCount((count) => count - delta);
  const reset = () => setCount(initialCount);

  return {
    count,
    set: setCount,
    increment,
    decrement,
    incrementBy,
    decrementBy,
    reset,
  };
}

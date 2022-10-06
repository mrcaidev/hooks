import { useState } from "react";

/**
 * Use a counter.
 */
export function useCounter(defaultValue = 0) {
  const [count, setCount] = useState(defaultValue);

  const increment = () => setCount((count) => count + 1);
  const decrement = () => setCount((count) => count - 1);
  const incrementBy = (value: number) => setCount((count) => count + value);
  const decrementBy = (value: number) => setCount((count) => count - value);
  const reset = () => setCount(defaultValue);

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

import { useState } from "react";

/**
 * Use a counter.
 * @param initialValue - Initial value of the counter, defaults to 0.
 * @returns The counter and some functions to update it.
 */
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((count) => count + 1);
  const decrement = () => setCount((count) => count - 1);
  const incrementBy = (value: number) => setCount((count) => count + value);
  const decrementBy = (value: number) => setCount((count) => count - value);
  const reset = () => setCount(initialValue);

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

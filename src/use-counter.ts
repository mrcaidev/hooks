import { useState } from "react";

/**
 * Use a counter.
 * @param initialValue - Initial value of the counter, defaults to 0.
 * @returns A counter and functions to update it.
 */
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((count) => count + 1);
  const decrement = () => setCount((count) => count - 1);
  const incrementBy = (value: number) => setCount((count) => count + value);
  const decrementBy = (value: number) => setCount((count) => count - value);
  const reset = () => setCount(initialValue);
  const resetToZero = () => setCount(0);

  return {
    count,
    set: setCount,
    increment,
    decrement,
    incrementBy,
    decrementBy,
    reset,
    resetToZero,
  };
}

import { useState } from "react";

/**
 * Use a counter.
 *
 * @param initialCount The initial value of the counter.
 *
 * @return An object containing the current value of the counter and functions
 * to update it.
 *
 * @see https://hooks.mrcai.dev/hooks/use-counter
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

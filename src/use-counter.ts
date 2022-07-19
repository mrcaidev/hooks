import { useState } from "react";

/**
 * Contains a counter and some functions to update it.
 *
 * @public
 */
export interface UseCounterResult {
  /** Current counter number. */
  count: number;

  /** Set counter to an arbitrary value. */
  setCount: (value: number) => void;

  /** Increment counter by 1. */
  increment: () => void;

  /** Decrement counter by 1. */
  decrement: () => void;

  /** Increment counter by a specific value. */
  incrementBy: (value: number) => void;

  /** Decrement counter by a specific value. */
  decrementBy: (value: number) => void;

  /** Reset counter to initial value. */
  reset: () => void;

  /** Reset counter to 0. */
  resetToZero: () => void;
}

/**
 * Use a counter.
 *
 * @param initialValue - Initial value of the counter, defaults to 0.
 * @returns A counter and some functions to update it.
 *
 * @public
 */
export function useCounter(initialValue = 0): UseCounterResult {
  const [count, setCount] = useState(initialValue);

  // Increment by 1.
  const increment = () => {
    setCount((count) => count + 1);
  };

  // Decrement by 1.
  const decrement = () => {
    setCount((count) => count - 1);
  };

  // Increment by a specified value.
  const incrementBy = (value: number) => {
    setCount((count) => count + value);
  };

  // Decrement by a specified value.
  const decrementBy = (value: number) => {
    setCount((count) => count - value);
  };

  // Reset counter.
  const reset = () => {
    setCount(initialValue);
  };

  // Reset counter to 0.
  const resetToZero = () => {
    setCount(0);
  };

  return {
    count,
    setCount,
    increment,
    decrement,
    incrementBy,
    decrementBy,
    reset,
    resetToZero,
  };
}

import { useState } from "react";

/** Result of useCounter. */
export interface UseCounterResult {
  /** Current count. */
  count: number;

  /** Set count to arbitrary number. */
  set: (value: number) => void;

  /** Increment count by 1. */
  increment: () => void;

  /** Decrement count by 1. */
  decrement: () => void;

  /** Increment count by arbitrary number. */
  incrementBy: (value: number) => void;

  /** Decrement count by arbitrary number. */
  decrementBy: (value: number) => void;

  /** Reset count to initial value. */
  reset: () => void;

  /** Reset count to 0. */
  resetToZero: () => void;
}

/**
 * Use a counter.
 * @param initialValue - Initial value of the counter, defaults to 0.
 * @returns A counter and functions to update it.
 */
export function useCounter(initialValue = 0): UseCounterResult {
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

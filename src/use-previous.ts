import { useRef } from "react";

/**
 * Use the previous value of a state.
 */
export function usePrevious<T>(value: T, equalFn = (a: T, b: T) => a === b) {
  const previousRef = useRef<T | undefined>(undefined);

  const currentRef = useRef(value);

  if (!equalFn(currentRef.current, value)) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
}

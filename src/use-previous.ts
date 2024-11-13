import { useRef } from "react";

/**
 * Use the previous value of a state.
 */
export function usePrevious<T>(
  value: T,
  equalFn = (old: T, now: T) => old === now,
) {
  const previousRef = useRef<T | null>(null);

  const currentRef = useRef(value);

  if (!equalFn(currentRef.current, value)) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
}

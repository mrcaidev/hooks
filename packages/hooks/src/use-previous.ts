import { useEffect, useRef } from "react";

/**
 * Use the previous value of a state.
 */
export function usePrevious<T>(
  value: T,
  shouldUpdate = (a: T, b: T) => a !== b
) {
  const previousRef = useRef<T | undefined>(undefined);
  const currentRef = useRef(value);
  const shouldUpdateRef = useRef(shouldUpdate);
  shouldUpdateRef.current = shouldUpdate;

  useEffect(() => {
    if (!shouldUpdateRef.current(value, currentRef.current)) {
      return;
    }
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }, [value]);

  return previousRef;
}

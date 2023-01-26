import { useEffect, useRef } from "react";
import { useLatest } from "./use-latest";

/**
 * Use the previous value of a state.
 */
export function usePrevious<T>(value: T, equalFn = (a: T, b: T) => a === b) {
  const previousRef = useRef<T | undefined>(undefined);
  const currentRef = useRef(value);
  const equalFnRef = useLatest(equalFn);

  useEffect(() => {
    if (equalFnRef.current(value, currentRef.current)) {
      return;
    }

    previousRef.current = currentRef.current;
    currentRef.current = value;
  }, [value, equalFnRef]);

  return previousRef;
}

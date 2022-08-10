import { useEffect, useRef, useState } from "react";
import { useUnmount } from "./use-unmount";
import { type TimeoutOptions } from "./utils/timeout";

/**
 * Debounce a value.
 * @param value - The value to be debounced.
 * @param options - An object that specifies the behavior of debounce,
 *                  defaults to `{}`.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, options: TimeoutOptions = {}) {
  const { timeout = 500, onMount = false } = options;

  const isMounted = useRef(false);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (!onMount && !isMounted.current) {
      isMounted.current = true;
      return;
    }

    console.log("setTimeout");
    const timer = setTimeout(() => setDebouncedValue(value), timeout);
    return () => clearTimeout(timer);
  }, [value, timeout, onMount]);

  useUnmount(() => {
    isMounted.current = false;
  });

  return debouncedValue;
}

import { useEffect, useRef, useState } from "react";

type Options = {
  timeout?: number;
  onMount?: boolean;
};

/**
 * Debounce a value.
 */
export function useDebounce<T>(value: T, options: Options = {}) {
  const { timeout = 500, onMount = false } = options;

  const [debouncedValue, setDebouncedValue] = useState(value);
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!onMount && !isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }

    const timer = setTimeout(() => setDebouncedValue(value), timeout);
    return () => clearTimeout(timer);
  }, [value, timeout, onMount]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return debouncedValue;
}

import { useEffect, useRef, useState } from "react";

export type UseDebounceOptions = {
  timeout?: number;
  onMount?: boolean;
};

/**
 * Debounce a value.
 */
export function useDebounce<T>(value: T, options: UseDebounceOptions = {}) {
  const { timeout = 500, onMount = false } = options;

  const [debouncedValue, setDebouncedValue] = useState(value);

  const shouldSkipRef = useRef(true);

  useEffect(() => {
    if (!onMount && shouldSkipRef.current) {
      shouldSkipRef.current = false;
      return;
    }

    const timer = setTimeout(() => setDebouncedValue(value), timeout);
    return () => clearTimeout(timer);
  }, [value, timeout, onMount]);

  return debouncedValue;
}

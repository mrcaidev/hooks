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
  const isJustMountedRef = useRef(true);

  useEffect(() => {
    if (!onMount && isJustMountedRef.current) {
      isJustMountedRef.current = false;
      return;
    }

    const timer = setTimeout(() => setDebouncedValue(value), timeout);
    return () => clearTimeout(timer);
  }, [value, timeout, onMount]);

  return debouncedValue;
}

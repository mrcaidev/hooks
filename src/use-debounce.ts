import { useEffect, useState } from "react";

/**
 * Debounce a frequently changing value.
 * @param value - The value to debounce.
 * @param timeout - Timeout (ms) before the value is updated.
 * @returns Debounced value.
 */
export function useDebounce<T>(value: T, timeout = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), timeout);
    return () => clearTimeout(timer);
  }, [value, timeout]);

  return debouncedValue;
}

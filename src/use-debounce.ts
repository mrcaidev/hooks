import { useState } from "react";
import { useDebounceEffect } from "./use-debounce-effect";

export type UseDebounceOptions = {
  timeout?: number;
  onMount?: boolean;
};

/**
 * Debounce a value.
 */
export function useDebounce<T>(value: T, options: UseDebounceOptions = {}) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useDebounceEffect(() => setDebouncedValue(value), [value], options);

  return debouncedValue;
}

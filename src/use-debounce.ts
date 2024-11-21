import { useState } from "react";
import { useDebounceEffect } from "./use-debounce-effect";

/**
 * The options to configure the `useDebounce` hook.
 */
export type UseDebounceOptions = {
  /**
   * The timeout in milliseconds between the last action of change and the
   * actual time of that change being applied.
   *
   * Changes of this value will clear the current timer (with the old `timeout`
   * value) and start a new one (with the new `timeout` value).
   *
   * @default 500
   */
  timeout?: number;

  /**
   * Whether to immediately start debouncing after the component is mounted.
   *
   * @default false
   */
  onMount?: boolean;
};

/**
 * Debounce a value.
 *
 * @param value The value to be debounced.
 * @param options The options to configure the hook.
 *
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, options: UseDebounceOptions = {}) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useDebounceEffect(() => setDebouncedValue(value), [value], options);

  return debouncedValue;
}

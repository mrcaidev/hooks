import { useRef } from "react";

/**
 * Use a memorized value.
 *
 * @param fn - A function whose return value will be memorized.
 * @returns The memorized value.
 *
 * @public
 */
export function useConst<T>(fn: () => T): T {
  const ref = useRef<{ value: T }>();

  // If this is the first time, compute and cache the result.
  if (!ref.current) {
    ref.current = { value: fn() };
  }

  // Otherwise, return the cached result.
  return ref.current.value;
}

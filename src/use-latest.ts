import { useRef } from "react";

/**
 * Cache a mutable value, and always return its latest value.
 * @param value - Initial value of the mutable value.
 * @returns A ref object containing the latest value.
 */
export function useLatest<T>(value: T) {
  const ref = useRef<T>(value);
  ref.current = value;
  return ref;
}

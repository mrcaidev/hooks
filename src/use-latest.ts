import { useRef } from "react";

/**
 * Use the latest value, preventing stale closure.
 */
export function useLatest<T>(value: T) {
  const ref = useRef<T>(value);

  ref.current = value;

  return ref;
}

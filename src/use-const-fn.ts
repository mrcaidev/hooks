import { useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (...args: any[]) => any;

/**
 * Use an immutable function, which stays the same across re-renders.
 */
export function useConstFn<T extends Fn>(fn: T) {
  return useCallback(fn, []);
}

import { useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (...args: any[]) => any;

/**
 * Make a function constant.
 */
export function useConstFn<T extends Fn>(fn: T) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(fn, []);
}

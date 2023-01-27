import { useCallback } from "react";

/**
 * Make a function constant.
 */
export function useConstFn<T extends Fn>(fn: T) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(fn, []);
}

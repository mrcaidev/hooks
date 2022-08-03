import { useCallback } from "react";

/**
 * Use a constant function.
 * @param fn - A function to be made constant.
 * @returns A constant function.
 */
export function useConstFn<T extends (...args: any) => any>(fn: T) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(fn, []);
}

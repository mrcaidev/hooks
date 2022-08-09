import { useCallback } from "react";

/**
 * Memorize a function.
 * @param fn - The function to be made constant.
 * @returns The constant function.
 */
export function useConstFn<T extends (...args: any) => any>(fn: T) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(fn, []);
}

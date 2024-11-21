import { useCallback } from "react";
import type { Fn } from "./types";

/**
 * Memoize a function, which stays the same across rerenders.
 *
 * @param fn The function to memoize.
 *
 * @returns Exactly the same function.
 *
 * @see https://hooks.mrcai.dev/hooks/use-const-fn
 */
export function useConstFn<T extends Fn>(fn: T) {
  return useCallback(fn, []);
}

import { useCallback } from "react";
import type { Fn } from "./types";

/**
 * Use an immutable function, which stays the same across re-renders.
 */
export function useConstFn<T extends Fn>(fn: T) {
  return useCallback(fn, []);
}

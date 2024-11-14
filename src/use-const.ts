import { useMemo } from "react";

/**
 * Memoize a value, which stays the same across rerenders.
 */
export function useConst<T>(factory: () => T) {
  return useMemo(factory, []);
}

import { useMemo } from "react";

/**
 * Use an immutable value, which stays the same across re-renders.
 */
export function useConst<T>(factory: () => T) {
  return useMemo(factory, []);
}

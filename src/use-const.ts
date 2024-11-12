import { useMemo } from "react";

/**
 * Use an immutable value, which stays the same across re-renders.
 */
export function useConst<T>(fn: () => T) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(fn, []);
}

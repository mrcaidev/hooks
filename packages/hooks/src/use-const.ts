import { useMemo } from "react";

/**
 * Make a value constant.
 */
export function useConst<T>(fn: () => T) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(fn, []);
}

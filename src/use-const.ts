import { useMemo } from "react";

/**
 * Use a constant value.
 * @param fn - A function to generate the constant value.
 * @returns A constant value.
 */
export function useConst<T>(fn: () => T) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(fn, []);
}

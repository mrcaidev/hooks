import { useMemo } from "react";

/**
 * Memorize a value.
 * @param fn - A function to generate the constant value.
 * @returns The constant value.
 */
export function useConst<T>(fn: () => T) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(fn, []);
}

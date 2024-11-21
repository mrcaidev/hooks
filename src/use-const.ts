import { useMemo } from "react";

/**
 * Memoize a value, which stays the same across rerenders.
 *
 * @see https://hooks.mrcai.dev/hooks/use-const
 */
export function useConst<T>(factory: () => T) {
  return useMemo(factory, []);
}

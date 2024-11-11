import { useEffect, type DependencyList, type EffectCallback } from "react";
import type { Async } from "./types/utils";
import { useLatest } from "./use-latest";

export type AsyncEffectCallback = Async<EffectCallback>;

/**
 * The same as `useEffect`, but for async functions.
 */
export function useAsyncEffect(
  effect: AsyncEffectCallback,
  deps?: DependencyList,
) {
  const effectRef = useLatest(effect);

  useEffect(() => {
    effectRef.current();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

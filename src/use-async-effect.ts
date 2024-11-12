import { useEffect, type DependencyList, type EffectCallback } from "react";
import { useLatest } from "./use-latest";

/**
 * Same as `EffectCallback`, but can return a promise.
 */
export type AsyncEffectCallback = (
  ...args: Parameters<EffectCallback>
) => Promise<ReturnType<EffectCallback>>;

/**
 * Same as `useEffect`, but can accept an async function.
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

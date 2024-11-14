import { useEffect, type DependencyList, type EffectCallback } from "react";
import { useLatest } from "./use-latest";

/**
 * Same as `EffectCallback`, but can be asynchronous.
 */
export type AsyncEffectCallback = (
  ...args: Parameters<EffectCallback>
) => Promise<ReturnType<EffectCallback>>;

/**
 * Same as `useEffect`, but the effect can be asynchronous.
 *
 * @param effect The asynchronous effect to run.
 * @param deps The dependencies of the effect, just like in `useEffect`.
 * Defaults to `undefined`.
 *
 * @note
 * Destructor is not yet supported. The cleanup function returned by the
 * effect will be ignored and discarded.
 */
export function useAsyncEffect(
  effect: AsyncEffectCallback,
  deps?: DependencyList,
) {
  const effectRef = useLatest(effect);

  useEffect(() => {
    effectRef.current();
  }, deps);
}

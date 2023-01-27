import { useEffect, type DependencyList, type EffectCallback } from "react";
import { useLatest } from "./use-latest";

export type AsyncEffectCallback = Async<EffectCallback>;

export function useAsyncEffect(
  effect: AsyncEffectCallback,
  deps?: DependencyList
) {
  const effectRef = useLatest(effect);

  useEffect(() => {
    effectRef.current();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

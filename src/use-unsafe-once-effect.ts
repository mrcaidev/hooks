import { useRef, type EffectCallback } from "react";
import { useLatest } from "./use-latest";
import { useMount } from "./use-mount";

/**
 * Trigger an effect exactly once.
 */
export function useUnsafeOnceEffect(effect: EffectCallback) {
  const effectRef = useLatest(effect);

  const isFirstRenderRef = useRef(true);

  useMount(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    return effectRef.current();
  });
}

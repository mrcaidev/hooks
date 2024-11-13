import { useRef, type EffectCallback } from "react";
import { useLatest } from "./use-latest";
import { useMount } from "./use-mount";

/**
 * Trigger an effect exactly once.
 */
export function useUnsafeOnceEffect(effect: EffectCallback) {
  const effectRef = useLatest(effect);

  const shouldSkipRef = useRef(false);

  useMount(() => {
    if (shouldSkipRef.current) {
      return;
    }

    shouldSkipRef.current = true;

    return effectRef.current();
  });
}

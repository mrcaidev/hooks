import { useEffect, useRef, type EffectCallback } from "react";
import { useLatest } from "./use-latest";

/**
 * Trigger an effect exactly once.
 */
export function useUnsafeOnceEffect(effect: EffectCallback) {
  const effectRef = useLatest(effect);

  const shouldSkipRef = useRef(false);

  useEffect(() => {
    if (shouldSkipRef.current) {
      return;
    }

    shouldSkipRef.current = true;

    return effectRef.current();
  }, []);
}

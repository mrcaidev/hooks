import { useEffect, useRef, type EffectCallback } from "react";
import { useLatest } from "./use-latest";

/**
 * Trigger effect only once, even under React 18 strict dev mode.
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
  }, [effectRef]);
}

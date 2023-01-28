import { EffectCallback, useEffect, useRef } from "react";
import { useLatest } from "./use-latest";
import { useUnmount } from "./use-unmount";

/**
 * Trigger effect after the component is updated.
 */
export function useUpdate(effect: EffectCallback) {
  const effectRef = useLatest(effect);
  const shouldSkipRef = useRef(true);

  useEffect(() => {
    if (shouldSkipRef.current) {
      shouldSkipRef.current = false;
      return;
    }

    return effectRef.current();
  });

  useUnmount(() => {
    shouldSkipRef.current = true;
  });
}

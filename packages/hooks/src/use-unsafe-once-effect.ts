import { useEffect, useRef, type EffectCallback } from "react";
import { useLatest } from "./use-latest";

export function useUnsafeOnceEffect(effect: EffectCallback) {
  const effectRef = useLatest(effect);
  const isExecutedRef = useRef(false);

  useEffect(() => {
    if (isExecutedRef.current) {
      return;
    }
    isExecutedRef.current = true;

    return effectRef.current();
  }, [effectRef]);
}

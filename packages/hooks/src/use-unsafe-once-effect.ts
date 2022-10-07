import { useEffect, useRef, type EffectCallback } from "react";

export function useUnsafeOnceEffect(effect: EffectCallback) {
  const isExecutedRef = useRef(false);
  const effectRef = useRef(effect);
  effectRef.current = effect;

  useEffect(() => {
    if (isExecutedRef.current) {
      return;
    }

    isExecutedRef.current = true;

    return effectRef.current();
  }, []);
}

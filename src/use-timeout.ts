import { useEffect, type EffectCallback } from "react";
import { useLatest } from "./use-latest";

/**
 * Run an effect after a timeout.
 */
export function useTimeout(effect: EffectCallback, timeout = 500) {
  const effectRef = useLatest(effect);

  useEffect(() => {
    const timer = setTimeout(effectRef.current, timeout);
    return () => clearTimeout(timer);
  }, [effectRef, timeout]);
}

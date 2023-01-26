import { useEffect, type EffectCallback } from "react";
import { useLatest } from "./use-latest";

/**
 * Run an effect at a regular interval.
 */
export function useInterval(effect: EffectCallback, timeout = 500) {
  const effectRef = useLatest(effect);

  useEffect(() => {
    const timer = setInterval(effectRef.current, timeout);
    return () => clearInterval(timer);
  }, [effectRef, timeout]);
}

import { useEffect, useRef, type EffectCallback } from "react";

/**
 * Run an effect at a regular interval.
 */
export function useInterval(effect: EffectCallback, timeout = 500) {
  const effectRef = useRef(effect);
  effectRef.current = effect;

  useEffect(() => {
    const timer = setInterval(effectRef.current, timeout);
    return () => clearInterval(timer);
  }, [effectRef, timeout]);
}

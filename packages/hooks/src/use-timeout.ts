import { useEffect, useRef, type EffectCallback } from "react";

/**
 * Run an effect after a timeout.
 */
export function useTimeout(effect: EffectCallback, timeout = 500) {
  const effectRef = useRef(effect);
  effectRef.current = effect;

  useEffect(() => {
    const timer = setTimeout(effectRef.current, timeout);
    return () => clearTimeout(timer);
  }, [timeout]);
}

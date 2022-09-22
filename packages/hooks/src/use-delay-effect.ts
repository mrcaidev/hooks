import { useEffect, useRef, type EffectCallback } from "react";

/**
 * Delay an effect.
 * @param effect - The effect to be delayed.
 * @param timeout - Timeout of the delay.
 */
export function useDelayEffect(effect: EffectCallback, timeout = 500) {
  const effectRef = useRef(effect);
  effectRef.current = effect;

  useEffect(() => {
    const timer = setTimeout(effectRef.current, timeout);
    return () => clearTimeout(timer);
  }, [timeout]);
}

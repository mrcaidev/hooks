import { useEffect, type EffectCallback } from "react";

/**
 * Trigger effect after the component is mounted.
 */
export function useMount(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}

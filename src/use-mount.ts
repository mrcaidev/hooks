import { useEffect, type EffectCallback } from "react";

/**
 * Trigger an effect only after the component is mounted.
 */
export function useMount(effect: EffectCallback) {
  useEffect(effect, []);
}

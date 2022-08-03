import { useEffect, type EffectCallback } from "react";

/**
 * Use mount phase.
 * @param effect - A callback function to run on mount phase.
 */
export function useMount(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}

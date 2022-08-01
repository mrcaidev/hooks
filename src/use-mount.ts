import { useEffect, type EffectCallback } from "react";

/**
 * Use mount phase.
 * @param effect - Callback to run on mount.
 */
export function useMount(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}

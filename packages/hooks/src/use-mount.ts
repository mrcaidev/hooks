import { useEffect, type EffectCallback } from "react";

/**
 * Run only on mount.
 */
export function useMount(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}

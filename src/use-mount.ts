import { useEffect, type EffectCallback } from "react";

/**
 * Use `ComponentDidMount`.
 *
 * @param effect - Callback to run on mount.
 */
export function useMount(effect: EffectCallback): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}

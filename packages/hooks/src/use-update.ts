import {
  useEffect,
  useRef,
  type DependencyList,
  type EffectCallback,
} from "react";
import { useLatest } from "./use-latest";

/**
 * Use update phase.
 */
export function useUpdate(effect: EffectCallback, deps: DependencyList = []) {
  const effectRef = useLatest(effect);
  const shouldSkipRef = useRef(true);

  useEffect(() => {
    if (shouldSkipRef.current) {
      shouldSkipRef.current = false;
      return;
    }

    const cleanup = effectRef.current();
    return cleanup;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectRef, ...deps]);
}

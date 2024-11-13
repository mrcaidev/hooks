import {
  type DependencyList,
  type EffectCallback,
  useEffect,
  useRef,
} from "react";
import { useLatest } from "./use-latest";

/**
 * Trigger an effect only after component or dependency updates.
 */
export function useUpdate(effect: EffectCallback, deps?: DependencyList) {
  const effectRef = useLatest(effect);

  const shouldSkipRef = useRef(true);

  useEffect(() => {
    if (shouldSkipRef.current) {
      shouldSkipRef.current = false;
      return;
    }

    return effectRef.current();
  }, deps);
}

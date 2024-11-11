import {
  useEffect,
  useRef,
  type DependencyList,
  type EffectCallback,
} from "react";
import { useLatest } from "./use-latest";

export type UseThrottleEffectOptions = {
  timeout?: number;
  onMount?: boolean;
};

/**
 * Throttle an effect.
 */
export function useThrottleEffect(
  effect: EffectCallback,
  deps: DependencyList = [],
  options: UseThrottleEffectOptions = {},
) {
  const { timeout = 500, onMount = false } = options;

  const effectRef = useLatest(effect);
  const shouldSkipRef = useRef(true);
  const isCoolingDownRef = useRef(false);

  useEffect(() => {
    if (!onMount && shouldSkipRef.current) {
      shouldSkipRef.current = false;
      return;
    }

    if (isCoolingDownRef.current) {
      return;
    }

    effectRef.current();

    isCoolingDownRef.current = true;
    setTimeout(() => {
      isCoolingDownRef.current = false;
    }, timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectRef, ...deps, timeout, onMount]);
}

import {
  useEffect,
  useRef,
  type DependencyList,
  type EffectCallback,
} from "react";
import { useLatest } from "./use-latest";

type Options = {
  timeout?: number;
  onMount?: boolean;
};

/**
 * Throttle an effect.
 */
export function useThrottleEffect(
  effect: EffectCallback,
  deps: DependencyList = [],
  options: Options = {}
) {
  const { timeout = 500, onMount = false } = options;

  const effectRef = useLatest(effect);
  const isJustMountedRef = useRef(true);
  const isCoolingDownRef = useRef(false);

  useEffect(() => {
    if (!onMount && isJustMountedRef.current) {
      isJustMountedRef.current = false;
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

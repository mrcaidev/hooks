import {
  useEffect,
  useRef,
  type DependencyList,
  type EffectCallback,
} from "react";
import { useUnmount } from "./use-unmount";
import type { TimeoutOptions } from "./utils/timeout";

/**
 * Throttle a side effect.
 * @param effect - The effect callback to be throttled.
 * @param deps - Dependencies to be passed to the effect callback, defaults to `[]`.
 * @param options - An object that specifies the behavior of throttle,
 *                  defaults to `{}`.
 */
export function useThrottleEffect(
  effect: EffectCallback,
  deps: DependencyList = [],
  options: TimeoutOptions = {}
) {
  const { timeout = 500, onMount = false } = options;

  const isMounted = useRef(false);
  const isCoolingDown = useRef(false);

  useEffect(() => {
    if (!onMount && !isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (isCoolingDown.current) return;

    effect();

    isCoolingDown.current = true;
    setTimeout(() => {
      isCoolingDown.current = false;
    }, timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, timeout, onMount]);

  useUnmount(() => {
    isMounted.current = false;
  });
}

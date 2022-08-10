import {
  useEffect,
  useRef,
  type DependencyList,
  type EffectCallback,
} from "react";
import { useUnmount } from "./use-unmount";
import { type TimeoutOptions } from "./utils/timeout";

/**
 * Debounce a side effect.
 * @param effect - The effect callback to be debounced.
 * @param deps - Dependencies to be passed to the effect callback, defaults to `[]`.
 * @param options - An object that specifies the behavior of debounce,
 *                  defaults to `{}`.
 */
export function useDebounceEffect(
  effect: EffectCallback,
  deps: DependencyList = [],
  options: TimeoutOptions = {}
) {
  const { timeout = 500, onMount = false } = options;

  const isMounted = useRef(false);

  useEffect(() => {
    if (!onMount && !isMounted.current) {
      isMounted.current = true;
      return;
    }

    const timer = setTimeout(effect, timeout);
    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, timeout, onMount]);

  useUnmount(() => {
    isMounted.current = false;
  });
}

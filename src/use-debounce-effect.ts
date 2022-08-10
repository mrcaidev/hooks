import {
  useEffect,
  useRef,
  type DependencyList,
  type EffectCallback,
} from "react";
import { useUnmount } from "./use-unmount";

/** Options to specify the behavior of debounce. */
export interface UseDebounceEffectOptions {
  /** Timeout (ms) before effect callback is called, defaults to 500. */
  timeout?: number;

  /**
   * If `true`, the timer will immediately start after mounted.
   * If `false`, the timer will only start on dependency or option updates.
   * Defaults to `false`.
   */
  onMount?: boolean;
}

/**
 * Debounce a side effect.
 * @param effect - Effect callback to be debounced.
 * @param deps - Dependencies to be passed to the effect callback, defaults to `[]`.
 * @param options - Options to specify the behavior of
 *                  the effect callback, defaults to `{}`.
 */
export function useDebounceEffect(
  effect: EffectCallback,
  deps: DependencyList = [],
  options: UseDebounceEffectOptions = {}
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

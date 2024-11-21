import {
  useEffect,
  useRef,
  type DependencyList,
  type EffectCallback,
} from "react";
import { useLatest } from "./use-latest";

/**
 * The options to configure `useDebounceEffect` hook.
 */
export type UseDebounceEffectOptions = {
  /**
   * The time in milliseconds between the last call of the effect and the
   * actual execution.
   *
   * Changes of this value will clear the current timer (with the old `timeout`
   * value) and start a new one (with the new `timeout` value).
   *
   * @default 500
   */
  timeout?: number;

  /**
   * Whether to immediately call the effect and trigger the debouncing
   * mechanism when the hook is mounted.
   *
   * @default false
   */
  onMount?: boolean;
};

/**
 * Debounce an effect.
 *
 * @param effect The effect to be debounced.
 * @param deps The dependencies of the effect, just like in `useEffect`.
 * @param options The options to configure the hook.
 */
export function useDebounceEffect(
  effect: EffectCallback,
  deps: DependencyList = [],
  options: UseDebounceEffectOptions = {},
) {
  const { timeout = 500, onMount = false } = options;

  const effectRef = useLatest(effect);

  const shouldSkipRef = useRef(true);

  useEffect(() => {
    if (!onMount && shouldSkipRef.current) {
      shouldSkipRef.current = false;
      return;
    }

    const timer = setTimeout(effectRef.current, timeout);

    return () => clearTimeout(timer);
  }, [...deps, timeout, onMount]);
}

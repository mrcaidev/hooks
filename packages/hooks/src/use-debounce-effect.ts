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
 * Debounce an effect.
 */
export function useDebounceEffect(
  effect: EffectCallback,
  deps: DependencyList = [],
  options: Options = {}
) {
  const { timeout = 500, onMount = false } = options;

  const effectRef = useLatest(effect);
  const isJustMountedRef = useRef(true);

  useEffect(() => {
    if (!onMount && isJustMountedRef.current) {
      isJustMountedRef.current = false;
      return;
    }

    const timer = setTimeout(effectRef.current, timeout);
    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectRef, ...deps, timeout, onMount]);
}

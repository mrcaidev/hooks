import {
  useEffect,
  useRef,
  type DependencyList,
  type EffectCallback,
} from "react";

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

  const isMountedRef = useRef(false);
  const effectRef = useRef(effect);
  effectRef.current = effect;

  useEffect(() => {
    if (!onMount && !isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }

    const timer = setTimeout(effectRef.current, timeout);
    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, timeout, onMount]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
}

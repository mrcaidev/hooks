import {
  useEffect,
  useRef,
  type DependencyList,
  type EffectCallback,
} from "react";

interface Options {
  timeout?: number;
  onMount?: boolean;
}

/**
 * Throttle an effect.
 */
export function useThrottleEffect(
  effect: EffectCallback,
  deps: DependencyList = [],
  options: Options = {}
) {
  const { timeout = 500, onMount = false } = options;

  const isMountedRef = useRef(false);
  const isCoolingDownRef = useRef(false);
  const effectRef = useRef(effect);
  effectRef.current = effect;

  useEffect(() => {
    if (!onMount && !isMountedRef.current) {
      isMountedRef.current = true;
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
  }, [...deps, timeout, onMount]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
}

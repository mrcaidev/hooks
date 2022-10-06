import {
  useEffect,
  useRef,
  type DependencyList,
  type EffectCallback,
} from "react";

/**
 * Use update phase.
 */
export function useUpdate(effect: EffectCallback, deps: DependencyList = []) {
  const isMountedRef = useRef(false);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    return effect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

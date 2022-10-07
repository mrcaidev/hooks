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
  const effectRef = useRef(effect);
  effectRef.current = effect;

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
    return effectRef.current();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

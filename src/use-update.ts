import {
  useEffect,
  useRef,
  type DependencyList,
  type EffectCallback,
} from "react";
import { useUnmount } from "./use-unmount";

/**
 * Use update phase.
 * @param effect - A callback function to run on update phase.
 * @param deps - Dependency list of effect, defaults to `[]`.
 */
export function useUpdate(effect: EffectCallback, deps: DependencyList = []) {
  const isMounted = useRef(false);

  useUnmount(() => {
    isMounted.current = false;
  });

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    return effect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

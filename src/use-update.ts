import {
  useEffect,
  useRef,
  type DependencyList,
  type EffectCallback,
} from "react";
import { useUnmount } from "./use-unmount";

/**
 * Use `ComponentDidUpdate`.
 *
 * @param effect - Callback to run on update.
 * @param deps - Dependency list of effect.
 *
 * @public
 */
export function useUpdate(
  effect: EffectCallback,
  deps: DependencyList = []
): void {
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

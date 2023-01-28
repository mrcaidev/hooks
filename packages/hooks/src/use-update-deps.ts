import {
  useEffect,
  useRef,
  type DependencyList,
  type EffectCallback,
} from "react";
import { useLatest } from "./use-latest";
import { useUnmount } from "./use-unmount";

/**
 * Use update phase caused by given dependencies.
 */
export function useUpdateDeps(
  effect: EffectCallback,
  deps: DependencyList = []
) {
  const effectRef = useLatest(effect);
  const shouldSkipRef = useRef(true);

  useEffect(() => {
    if (shouldSkipRef.current) {
      shouldSkipRef.current = false;
      return;
    }

    return effectRef.current();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectRef, ...deps]);

  useUnmount(() => {
    shouldSkipRef.current = true;
  });
}

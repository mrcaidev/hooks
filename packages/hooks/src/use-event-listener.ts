import { useEffect, type DependencyList, type RefObject } from "react";
import { useLatest } from "./use-latest";

export type UseEventListenerOptions = AddEventListenerOptions & {
  extraDeps?: DependencyList;
};

/**
 * Listen for any events.
 */
export function useEventListener<T extends EventTarget, K extends EventType<T>>(
  ref: RefObject<T>,
  type: K,
  callback: (e: EventMap<T>[K]) => void,
  options: UseEventListenerOptions = {}
) {
  const {
    capture = false,
    once = false,
    passive = false,
    extraDeps = [],
  } = options;

  const callbackRef = useLatest(callback);

  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }

    const listener = callbackRef.current as EventListener;

    target.addEventListener(type, listener, { capture, once, passive });
    return () => target.removeEventListener(type, listener);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, type, callbackRef, capture, once, passive, ...extraDeps]);
}

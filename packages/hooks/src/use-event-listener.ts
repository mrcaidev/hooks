import { useEffect, useRef, type RefObject } from "react";

/**
 * Listen for any events.
 */
export function useEventListener<T extends EventTarget, K extends EventType<T>>(
  ref: RefObject<T>,
  type: K,
  callback: (e: EventMap<T>[K]) => void,
  options: AddEventListenerOptions = {}
) {
  const { capture = false, once = false, passive = false } = options;

  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }

    const listener = callbackRef.current as EventListener;

    target.addEventListener(type, listener, { capture, once, passive });
    return () => target.removeEventListener(type, listener);
  }, [ref, type, capture, once, passive]);
}

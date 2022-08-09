import { useEffect, useRef, type RefObject } from "react";
import { off, on, type EventMap } from "./utils/event";
import { isRef } from "./utils/validator";

/**
 * Watch for events.
 * @param target - Target to attach event listener to.
 * @param type - Type of event to watch for.
 * @param callback - A callback to call when event is triggered.
 * @param options - An object that specifies characteristics about the event listener, defaults to `{}`.
 */
export function useEventListener<K extends keyof EventMap>(
  target: RefObject<HTMLElement> | Document | Window | null,
  type: K,
  callback: (e: EventMap[K]) => void,
  options: Omit<AddEventListenerOptions, "signal"> = {}
) {
  const { capture = false, once = false, passive = false } = options;

  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const realTarget = isRef(target) ? target.current : target;
    const listener = callbackRef.current as EventListener;

    on(realTarget, type, listener, { capture, once, passive });
    return () => off(realTarget, type, listener);
  }, [type, target, capture, once, passive]);
}

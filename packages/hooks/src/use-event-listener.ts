import { useEffect, useRef } from "react";
import {
  getTarget,
  off,
  on,
  type EventMap,
  type Target,
  type WithRef,
} from "./utils/event";

/**
 * Watch for events.
 * @param withRefTarget - The target to attach event listener to,
 *                        or a ref object of that target.
 * @param type - The type of event to watch for.
 * @param callback - A callback to call on the event.
 * @param options - An object that specifies characteristics
 *                  about the event listener, defaults to `{}`.
 */
export function useEventListener<K extends keyof EventMap>(
  withRefTarget: WithRef<Target>,
  type: K,
  callback: (e: EventMap[K]) => void,
  options: Omit<AddEventListenerOptions, "signal"> = {}
) {
  const { capture = false, once = false, passive = false } = options;

  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const target = getTarget(withRefTarget);
    if (!target) return;

    const listener = callbackRef.current as EventListener;
    on(target, type, listener, { capture, once, passive });
    return () => off(target, type, listener);
  }, [type, withRefTarget, capture, once, passive]);
}

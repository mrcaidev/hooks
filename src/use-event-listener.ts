import { useLatest } from "./use-latest";
import { useMount } from "./use-mount";
import { getTarget, type Target, type WithRef } from "./utils/target";

/** Mapping between event name and event type. */
export type EventMap = HTMLElementEventMap & DocumentEventMap & WindowEventMap;

/**
 * Watch for events.
 * @param target - Target to attach event listener to.
 * @param type - Type of event to watch for.
 * @param listener - Event listener on target event.
 * @param options - An object that specifies characteristics about the event listener, defaults to `{}`.
 */
export function useEventListener<K extends keyof EventMap>(
  target: WithRef<Target>,
  type: K,
  listener: (e: EventMap[K]) => void,
  options: AddEventListenerOptions = {}
) {
  const listenerRef = useLatest(listener);

  useMount(() => {
    const targetWithoutRef = getTarget(target);
    if (!targetWithoutRef || !targetWithoutRef.addEventListener) return;

    const listener = listenerRef.current as EventListener;
    targetWithoutRef.addEventListener(type, listener, options);

    return () => targetWithoutRef.removeEventListener(type, listener, options);
  });
}

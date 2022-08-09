/** Real targets: document, elements, window. */
export type Target = Document | HTMLElement | Window;

/** Mapping between event name and event type. */
export type EventMap = DocumentEventMap & HTMLElementEventMap & WindowEventMap;

export function on<K extends keyof EventMap>(
  target: Target | null | undefined,
  type: K,
  listener: (e: EventMap[K]) => void,
  options: AddEventListenerOptions = {}
) {
  if (!target || !target.addEventListener) return;
  target.addEventListener(type, listener as EventListener, options);
}

export function off<K extends keyof EventMap>(
  target: Target | null | undefined,
  type: K,
  listener: (E: EventMap[K]) => void
) {
  if (!target || !target.removeEventListener) return;
  target.removeEventListener(type, listener as EventListener);
}

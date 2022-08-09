import { type RefObject } from "react";
import { isBrowser, isRef } from "./validator";

/** Valid targets for events: document, elements, window. */
export type Target = Document | HTMLElement | Window;

/** Event target, or a ref object of event target. */
export type WithRef<T extends Target> = T | null | RefObject<T>;

/** Mapping between event name and event type. */
export type EventMap = DocumentEventMap & HTMLElementEventMap & WindowEventMap;

export function on<K extends keyof EventMap>(
  target: Target | null,
  type: K,
  listener: (e: EventMap[K]) => void,
  options: AddEventListenerOptions = {}
) {
  if (!target || !target.addEventListener) return;
  target.addEventListener(type, listener as EventListener, options);
}

export function off<K extends keyof EventMap>(
  target: Target | null,
  type: K,
  listener: (E: EventMap[K]) => void
) {
  if (!target || !target.removeEventListener) return;
  target.removeEventListener(type, listener as EventListener);
}

export function getTarget<T extends Target>(withRefTarget: WithRef<T>) {
  if (!isBrowser()) return null;
  if (isRef(withRefTarget)) return withRefTarget.current;
  return withRefTarget;
}

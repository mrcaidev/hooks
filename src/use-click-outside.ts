import type { RefObject } from "react";
import { useDocumentEventListener } from "./use-document-event-listener";
import { useLatest } from "./use-latest";

/**
 * Listen to click events outside of a node.
 */
export function useClickOutside<Target extends Node>(
  ref: RefObject<Target>,
  callback: (event: MouseEvent, target: Target) => void,
) {
  const callbackRef = useLatest(callback);

  useDocumentEventListener("mousedown", (event) => {
    const target = ref.current;

    if (!target) {
      return;
    }

    const isClickInside = target.contains(event.target as Node);

    if (isClickInside) {
      return;
    }

    callbackRef.current(event, target);
  });
}

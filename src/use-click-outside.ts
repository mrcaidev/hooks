import type { RefObject } from "react";
import { useDocumentEventListener } from "./use-document-event-listener";
import { useLatest } from "./use-latest";

/**
 * Listen to click events outside of a node.
 *
 * @param ref The ref of the node to listen for click events outside of.
 * @param callback The function to call when a click event occurs outside of
 * the node. The first argument is the click event, and the second argument is
 * the target node contained inside the `ref`.
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

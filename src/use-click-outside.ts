import type { RefObject } from "react";
import { useDocumentEventListener } from "./use-document-event-listener";
import { useLatest } from "./use-latest";

/**
 * Listen to click events outside of an element.
 */
export function useClickOutside(
  ref: RefObject<Element>,
  callback: (event: MouseEvent) => void,
) {
  const callbackRef = useLatest(callback);

  useDocumentEventListener("mousedown", (event) => {
    const container = ref.current;

    if (!container) {
      return;
    }

    const isClickInside = container.contains(event.target as Node);

    if (isClickInside) {
      return;
    }

    callbackRef.current(event);
  });
}

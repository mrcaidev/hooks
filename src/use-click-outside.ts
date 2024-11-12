import type { RefObject } from "react";
import { useDocument } from "./use-document";
import { useEventListener } from "./use-event-listener";
import { useLatest } from "./use-latest";

/**
 * Listen to click events outside of an element.
 */
export function useClickOutside(
  ref: RefObject<Element>,
  callback: (e: MouseEvent) => void,
) {
  const callbackRef = useLatest(callback);

  const documentRef = useDocument();

  useEventListener(documentRef, "mousedown", (e) => {
    const container = ref.current;

    if (!container) {
      return;
    }

    const isClickInside = container.contains(e.target as Node);

    if (isClickInside) {
      return;
    }

    callbackRef.current(e);
  });
}

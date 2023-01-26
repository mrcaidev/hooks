import type { RefObject } from "react";
import { useEventListener } from "./use-event-listener";

/**
 * Trap tab focus between two elements.
 */
export function useFocusTrap(
  firstRef: RefObject<HTMLElement>,
  lastRef: RefObject<HTMLElement>
) {
  useEventListener(firstRef, "keydown", (e) => {
    const first = firstRef.current;
    const last = lastRef.current;
    if (!first || !last) {
      return;
    }

    if (e.code !== "Tab" || !e.shiftKey) {
      return;
    }

    e.preventDefault();
    last.focus();
  });

  useEventListener(lastRef, "keydown", (e) => {
    const first = firstRef.current;
    const last = lastRef.current;
    if (!first || !last) {
      return;
    }

    if (e.code !== "Tab" || e.shiftKey) {
      return;
    }

    e.preventDefault();
    first.focus();
  });
}

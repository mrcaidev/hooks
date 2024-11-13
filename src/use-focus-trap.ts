import type { RefObject } from "react";
import { useEventListener } from "./use-event-listener";

/**
 * Trap tab focus between two HTML elements.
 */
export function useFocusTrap(
  firstRef: RefObject<HTMLElement>,
  lastRef: RefObject<HTMLElement>,
) {
  useEventListener(firstRef, "keydown", (event) => {
    const first = firstRef.current;
    const last = lastRef.current;

    if (!first || !last) {
      return;
    }

    if (!event.shiftKey || event.code !== "Tab") {
      return;
    }

    event.preventDefault();
    last.focus();
  });

  useEventListener(lastRef, "keydown", (event) => {
    const first = firstRef.current;
    const last = lastRef.current;

    if (!first || !last) {
      return;
    }

    if (event.shiftKey || event.code !== "Tab") {
      return;
    }

    event.preventDefault();
    first.focus();
  });
}

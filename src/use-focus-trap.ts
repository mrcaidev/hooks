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
    const last = lastRef.current;

    if (!last) {
      return;
    }

    const isShiftTab = event.shiftKey && event.code === "Tab";

    if (!isShiftTab) {
      return;
    }

    event.preventDefault();
    last.focus();
  });

  useEventListener(lastRef, "keydown", (event) => {
    const first = firstRef.current;

    if (!first) {
      return;
    }

    const isTab = !event.shiftKey && event.code === "Tab";

    if (!isTab) {
      return;
    }

    event.preventDefault();
    first.focus();
  });
}

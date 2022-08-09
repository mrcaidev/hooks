import { useEffect, type RefObject } from "react";
import { off, on } from "./utils/event";

/**
 * Trap tab focus between two elements.
 * @param firstRef - A ref object of the first focusable element in modal.
 * @param lastRef - A ref object of the last focusable element in modal.
 */
export function useFocusTrap(
  firstRef: RefObject<HTMLElement>,
  lastRef: RefObject<HTMLElement>
) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const firstElement = firstRef.current;
      const lastElement = lastRef.current;

      if (e.code !== "Tab") return;
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    on(document, "keydown", listener);
    return () => off(document, "keydown", listener);
  }, [firstRef, lastRef]);
}

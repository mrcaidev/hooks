import { useEffect } from "react";
import { getTarget, off, on, type WithRef } from "./utils/event";

/**
 * Trap tab focus between two elements.
 * @param withRefFirstElement - The first focusable element in modal,
 *                              or a ref object of that element.
 * @param withRefLastElement - The last focusable element in modal,
 *                             or a ref object of that element.
 */
export function useFocusTrap(
  withRefFirstElement: WithRef<HTMLElement>,
  withRefLastElement: WithRef<HTMLElement>
) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const firstElement = getTarget(withRefFirstElement);
      const lastElement = getTarget(withRefLastElement);
      if (!firstElement || !lastElement) return;

      if (e.code !== "Tab") return;
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    on(document, "keydown", listener);
    return () => off(document, "keydown", listener);
  }, [withRefFirstElement, withRefLastElement]);
}

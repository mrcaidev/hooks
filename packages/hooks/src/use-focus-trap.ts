import { useEffect, type RefObject } from "react";

/**
 * Trap tab focus between two elements.
 */
export function useFocusTrap(
  firstRef: RefObject<HTMLElement>,
  lastRef: RefObject<HTMLElement>
) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const first = firstRef.current;
      const last = lastRef.current;
      if (!first || !last) {
        return;
      }

      if (e.code !== "Tab") {
        return;
      }

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [firstRef, lastRef]);
}

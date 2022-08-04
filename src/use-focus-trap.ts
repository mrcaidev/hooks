import { useEffect, type RefObject } from "react";

/**
 * Trap the tab focus between two elements.
 * @param firstRef - A ref object of the element at the start of the trap.
 * @param lastRef - A ref object of the element at the end of the trap.
 */
export function useFocusTrap(
  firstRef: RefObject<HTMLElement>,
  lastRef: RefObject<HTMLElement>
) {
  const handleTab = (e: KeyboardEvent) => {
    if (e.code !== "Tab") return;
    if (e.shiftKey && document.activeElement === firstRef.current) {
      e.preventDefault();
      lastRef.current?.focus();
    } else if (!e.shiftKey && document.activeElement === lastRef.current) {
      e.preventDefault();
      firstRef.current?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

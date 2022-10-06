import { useEffect, useRef, type RefObject } from "react";

/**
 * Listen for click events outside of an element.
 */
export function useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: (e: MouseEvent) => void
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const container = ref.current;
      if (!container) {
        return;
      }

      const isClickInside = container.contains(e.target as Node);
      if (isClickInside) {
        return;
      }

      callbackRef.current(e);
    };

    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, [ref]);
}

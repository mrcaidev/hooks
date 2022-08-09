import { useEffect, useRef, type RefObject } from "react";
import { off, on } from "./utils/event";

/**
 * Watch for clicks outside an element.
 * @param ref - A ref object of the element to watch.
 * @param callback - A callback to call when the element is clicked outside.
 */
export function useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: (e: MouseEvent) => void
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      const isClickInside = element.contains(e.target as Node);
      if (isClickInside) return;

      callbackRef.current(e);
    };

    on(document, "click", listener);
    return () => off(document, "click", listener);
  }, [ref]);
}

import { useEffect, useRef } from "react";
import { getTarget, off, on, type WithRef } from "./utils/event";

/**
 * Watch for click events outside an element.
 * @param withRefElement - The element to watch, or a ref object of that element.
 * @param callback - A callback to call on click events outside the element.
 */
export function useClickOutside(
  withRefElement: WithRef<HTMLElement>,
  callback: (e: MouseEvent) => void
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const element = getTarget(withRefElement);
      if (!element) return;
      const isClickInside = element.contains(e.target as Node);
      if (isClickInside) return;
      callbackRef.current(e);
    };
    on(document, "click", listener);
    return () => off(document, "click", listener);
  }, [withRefElement]);
}

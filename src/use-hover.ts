import { useEffect, useState, type RefObject } from "react";
import { off, on } from "./utils/event";

/**
 * Watch for hovering on an element.
 * @param ref - A ref object of the element to watch.
 * @returns `true` if mouse is hovering on target element, or `false` otherwise.
 */
export function useHover(ref: RefObject<HTMLElement>) {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const element = ref.current;
    const enterListener = () => setIsHovering(true);
    const leaveListener = () => setIsHovering(false);

    on(element, "mouseenter", enterListener);
    on(element, "mouseleave", leaveListener);

    return () => {
      off(element, "mouseenter", enterListener);
      off(element, "mouseleave", leaveListener);
    };
  }, [ref]);

  return isHovering;
}

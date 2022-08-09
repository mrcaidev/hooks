import { useEffect, useState } from "react";
import { getTarget, off, on, type WithRef } from "./utils/event";

/**
 * Watch for hover events on an element.
 * @param withRefElement - The element to watch, or a ref object of that element.
 * @returns `true` if mouse is hovering on the element, or `false` otherwise.
 */
export function useHover(withRefElement: WithRef<HTMLElement>) {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const element = getTarget(withRefElement);
    const enterListener = () => setIsHovering(true);
    const leaveListener = () => setIsHovering(false);

    on(element, "mouseenter", enterListener);
    on(element, "mouseleave", leaveListener);

    return () => {
      off(element, "mouseenter", enterListener);
      off(element, "mouseleave", leaveListener);
    };
  }, [withRefElement]);

  return isHovering;
}

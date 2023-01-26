import { useState, type RefObject } from "react";
import { useEventListener } from "./use-event-listener";

/**
 * Listen for hover events on an element.
 */
export function useHover(ref: RefObject<HTMLElement>) {
  const [isHovering, setIsHovering] = useState(false);

  useEventListener(ref, "mouseenter", () => setIsHovering(true));
  useEventListener(ref, "mouseleave", () => setIsHovering(false));

  return isHovering;
}

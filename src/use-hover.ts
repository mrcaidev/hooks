import { useState, type RefObject } from "react";
import { useEventListener } from "./use-event-listener";

/**
 * Listen to hover events on an HTML element.
 */
export function useHover(ref: RefObject<HTMLElement>) {
  const [isHovering, setIsHovering] = useState(false);

  useEventListener(ref, "mouseenter", () => setIsHovering(true));
  useEventListener(ref, "mouseleave", () => setIsHovering(false));

  return isHovering;
}

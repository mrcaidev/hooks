import { useState } from "react";
import { useEventListener } from "./use-event-listener";
import { type WithRef } from "./utils/target";

/** Event listeners on hover state changes. */
export interface UseHoverListeners {
  /** Watch for mouse entering. */
  onEnter?: (e: MouseEvent) => void;

  /** Watch for mouse leaving. */
  onLeave?: (e: MouseEvent) => void;

  /** Watch for hover state changing. */
  onToggle?: (isHovering: boolean, e: MouseEvent) => void;
}

/**
 * Watch for hovering on an element.
 * @param target - Target to watch.
 * @param listeners - Event listeners on hover state changes.
 * @returns `true` if mouse is hovering on target element, or `false` otherwise.
 */
export function useHover(
  target: WithRef<HTMLElement | Element>,
  listeners: UseHoverListeners = {}
) {
  const { onEnter, onLeave, onToggle } = listeners;

  const [isHovering, setIsHovering] = useState(false);

  useEventListener(target, "mouseenter", (e) => {
    setIsHovering(true);
    onEnter?.(e);
    onToggle?.(true, e);
  });

  useEventListener(target, "mouseleave", (e) => {
    setIsHovering(false);
    onLeave?.(e);
    onToggle?.(false, e);
  });

  return isHovering;
}

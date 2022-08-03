import { useEffect, useState, type RefObject } from "react";

/** Callback functions on hover state changes. */
export interface UseHoverOptions {
  /** Callback function on mouse entering. */
  onEnter?: (e?: MouseEvent) => void;

  /** Callback function on mouse leaving. */
  onLeave?: (e?: MouseEvent) => void;

  /** Callback function on hover state changing. */
  onToggle?: (isHovering?: boolean, e?: MouseEvent) => void;
}

/**
 * Watch for hovering on an element.
 * @param ref - A ref object of target element.
 * @param options - Callback functions on hover state changes, defaults to `{}`.
 * @returns `true` if mouse is hovering on target element, or `false` otherwise.
 */
export function useHover(
  ref: RefObject<HTMLElement | null>,
  options: UseHoverOptions = {}
) {
  const { onEnter, onLeave, onToggle } = options;

  const [isHovering, setIsHovering] = useState(false);

  const handleEnter = (e: MouseEvent) => {
    setIsHovering(true);
    onEnter?.(e);
    onToggle?.(true, e);
  };
  const handleLeave = (e: MouseEvent) => {
    setIsHovering(false);
    onLeave?.(e);
    onToggle?.(false, e);
  };

  useEffect(() => {
    const target = ref.current;
    target?.addEventListener("mouseenter", handleEnter);
    target?.addEventListener("mouseleave", handleLeave);
    return () => {
      target?.addEventListener("mouseenter", handleEnter);
      target?.addEventListener("mouseleave", handleLeave);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isHovering;
}

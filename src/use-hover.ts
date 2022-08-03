import { useEffect, useState, type RefObject } from "react";

/** Callback functions on hover state changes. */
export interface UseHoverOptions {
  /** Callback function on mouse entering. */
  onEnter?: (e?: MouseEvent) => void;

  /** Callback function on mouse leaving. */
  onLeave?: (e?: MouseEvent) => void;

  // TODO: Exchange param order.
  /** Callback function on hover state changing. */
  onToggle?: (e?: MouseEvent, isHovering?: boolean) => void;
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
  // TODO: Leave unspecified callbacks as undefined.
  const {
    onEnter = () => {},
    onLeave = () => {},
    onToggle = () => {},
  } = options;

  const [isHovering, setIsHovering] = useState(false);

  // TODO: Move setIsHovering on top.
  const handleEnter = (e: MouseEvent) => {
    onEnter(e);
    setIsHovering(true);
    onToggle(e, true);
  };
  const handleLeave = (e: MouseEvent) => {
    onLeave(e);
    setIsHovering(false);
    onToggle(e, false);
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

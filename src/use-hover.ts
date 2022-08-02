import { useEffect, useState, type RefObject } from "react";

/** Actions to invoke on hover state changes. */
export interface UseHoverOptions {
  /** A function to invoke on mouse entering element. */
  onEnter?: (e?: MouseEvent) => void;

  /** A function to invoke on mouse leaving element. */
  onLeave?: (e?: MouseEvent) => void;

  /** A function to invoke on hover state changes. */
  onToggle?: (e?: MouseEvent, isHovering?: boolean) => void;
}

/**
 * Use hover state on container element.
 * @param ref - A ref object of container element.
 * @param options - Functions to invoke on hover state changes.
 * @returns `true` if mouse is hovering on container, or `false` otherwise.
 */
export function useHover(
  ref: RefObject<HTMLElement | null>,
  options: UseHoverOptions = {}
) {
  const {
    onEnter = () => {},
    onLeave = () => {},
    onToggle = () => {},
  } = options;

  const [isHovering, setIsHovering] = useState(false);

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

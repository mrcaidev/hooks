import { useEffect, useState, type RefObject } from "react";

/**
 * Listen for hover events on an element.
 */
export function useHover(ref: RefObject<HTMLElement>) {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }

    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    target.addEventListener("mouseenter", handleEnter);
    target.addEventListener("mouseleave", handleLeave);

    return () => {
      target.removeEventListener("mouseenter", handleEnter);
      target.removeEventListener("mouseleave", handleLeave);
    };
  }, [ref]);

  return isHovering;
}

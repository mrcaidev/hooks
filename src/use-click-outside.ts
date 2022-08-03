import { useEffect, type RefObject } from "react";

/**
 * Watch for clicks outside an element.
 * @param ref - A ref object of target element.
 * @param callback - A callback function on outside click events.
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  callback: (e?: MouseEvent) => void
) {
  const listener = (e: MouseEvent) => {
    const element = ref.current;
    if (!element || element.contains(e.target as Node)) return;
    callback(e);
  };

  useEffect(() => {
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

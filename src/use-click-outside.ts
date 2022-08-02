import { useEffect, type RefObject } from "react";

/**
 * Use clicking outside a container.
 * @param ref - A ref object on the container node.
 * @param callback - A function to invoke on outside clicks.
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  callback: (e: Event) => void
) {
  const listener = (e: Event) => {
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

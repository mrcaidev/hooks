import { useLatest } from "./use-latest";
import { useMount } from "./use-mount";
import { getTarget, type WithRef } from "./utils/target";

/**
 * Watch for clicks outside an element.
 * @param target - A ref object of target element.
 * @param listener - Event listener on outside click events.
 */
export function useClickOutside(
  target: WithRef<HTMLElement | Element>,
  listener: (e: MouseEvent) => void
) {
  const callbackRef = useLatest(listener);

  useMount(() => {
    const element = getTarget(target);
    if (!element || !element.addEventListener) return;

    const listener = (e: MouseEvent) => {
      if (element.contains(e.target as Node)) return;
      callbackRef.current(e);
    };
    document.addEventListener("click", listener);

    return () => document.removeEventListener("click", listener);
  });
}

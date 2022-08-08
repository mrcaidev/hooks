import { useMount } from "./use-mount";
import { getTarget, type WithRef } from "./utils/target";

/**
 * Trap tab focus between two elements.
 * @param firstTarget - Target at the start of the trap.
 * @param lastTarget - Target at the end of the trap.
 */
export function useFocusTrap(
  firstTarget: WithRef<HTMLElement>,
  lastTarget: WithRef<HTMLElement>
) {
  useMount(() => {
    const firstElement = getTarget(firstTarget);
    const lastElement = getTarget(lastTarget);
    if (
      !firstElement ||
      !firstElement.addEventListener ||
      !lastElement ||
      !lastElement.addEventListener
    )
      return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.code !== "Tab") return;
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };
    document.addEventListener("keydown", handleTab);

    return () => document.removeEventListener("keydown", handleTab);
  });
}

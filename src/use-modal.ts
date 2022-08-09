import { type RefObject } from "react";
import { useBoolean } from "./use-boolean";
import { useFocusTrap } from "./use-focus-trap";
import { useKeydown } from "./use-keydown";
import { useUpdate } from "./use-update";

/**
 * Use a modal.
 * @param openRef - A ref object of the element to open the modal.
 * @param firstRef - A ref object of the first focusable element in the modal.
 * @param lastRef - A ref object of the last focusable element in the modal.
 * @returns Whether the modal is open and functions to update it.
 */
export function useModal(
  openRef: RefObject<HTMLElement>,
  firstRef: RefObject<HTMLElement>,
  lastRef: RefObject<HTMLElement>
) {
  const { value: show, on: open, off: close } = useBoolean();

  useFocusTrap(firstRef, lastRef);

  useKeydown("Escape", close);

  useUpdate(() => {
    const firstElement = firstRef.current;
    const openElement = openRef.current;

    if (show) {
      firstElement?.focus();
    } else {
      openElement?.focus();
    }
  }, [show, openRef, firstRef]);

  return { show, open, close };
}

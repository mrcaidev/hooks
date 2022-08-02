import { useEffect } from "react";

/** Modifier keys. */
export interface ModifierKeys {
  /** `true` if Ctrl key is pressed at the same time. */
  ctrl?: boolean;

  /** `true` if Shift key is pressed at the same time. */
  shift?: boolean;

  /** `true` if Alt key is pressed at the same time. */
  alt?: boolean;

  /** `true` if Meta key is pressed at the same time. */
  meta?: boolean;
}

/**
 * Use keyDown event.
 * @param code - Code of target key to trigger callback.
 * @param callback - A function to invoke on key down.
 */
export function useKeydown(
  code: string,
  callback: (e: KeyboardEvent) => void,
  modifier: ModifierKeys = {}
) {
  const { ctrl = false, shift = false, alt = false, meta = false } = modifier;
  const listener = (e: KeyboardEvent) => {
    if (
      e.code === code &&
      e.ctrlKey === ctrl &&
      e.shiftKey === shift &&
      e.altKey === alt &&
      e.metaKey === meta
    ) {
      callback(e);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

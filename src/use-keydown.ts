import { useEffect } from "react";

/** Modifier keys. */
export interface ModifierKeys {
  /** `true` if "Ctrl" should be pressed, defaults to `false`. */
  ctrl?: boolean;

  /** `true` if "Shift" should be pressed, defaults to `false`. */
  shift?: boolean;

  /** `true` if "Alt" should be pressed, defaults to `false`. */
  alt?: boolean;

  /** `true` if "Meta" should be pressed, defaults to `false`. */
  meta?: boolean;
}

/**
 * Watch for keyDown events.
 * @param code - Code of target key.
 * @param callback - A callback function on keyDown events.
 * @param modifier - Modifier keys that should be pressed at the same time, defaults to `{}`.
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

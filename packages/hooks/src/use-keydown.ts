import { useEffect, useRef } from "react";
import { off, on } from "./utils/event";

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
 * Watch for key down events.
 * @param code - Code of the key to watch for.
 * @param callback - A callback to call on key down events.
 * @param modifier - Modifier keys that should be pressed at the same time, defaults to `{}`.
 */
export function useKeydown(
  code: string,
  callback: (e: KeyboardEvent) => void,
  modifier: ModifierKeys = {}
) {
  const { ctrl = false, shift = false, alt = false, meta = false } = modifier;

  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (
        e.code === code &&
        e.ctrlKey === ctrl &&
        e.shiftKey === shift &&
        e.altKey === alt &&
        e.metaKey === meta
      ) {
        callbackRef.current(e);
      }
    };

    on(document, "keydown", listener);
    return () => off(document, "keydown", listener);
  }, [code, ctrl, shift, alt, meta]);
}

import { useEffect, useRef } from "react";

type ModifierKeys = {
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
};

/**
 * Listen for keydown events.
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
        e.code !== code ||
        e.ctrlKey !== ctrl ||
        e.shiftKey !== shift ||
        e.altKey !== alt ||
        e.metaKey !== meta
      ) {
        return;
      }
      callbackRef.current(e);
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [code, ctrl, shift, alt, meta]);
}

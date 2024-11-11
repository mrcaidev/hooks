import { useDocument } from "./use-document";
import { useEventListener } from "./use-event-listener";
import { useLatest } from "./use-latest";

export type ModifierKeys = {
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
  modifier: ModifierKeys = {},
) {
  const { ctrl = false, shift = false, alt = false, meta = false } = modifier;

  const callbackRef = useLatest(callback);
  const documentRef = useDocument();

  useEventListener(
    documentRef,
    "keydown",
    (e) => {
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
    },
    { extraDeps: [code, ctrl, shift, alt, meta] },
  );
}

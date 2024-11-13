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
 * Listen to keydown events.
 */
export function useKeydown(
  key: string,
  callback: (event: KeyboardEvent) => void,
  modifier: ModifierKeys = {},
) {
  const { ctrl = false, shift = false, alt = false, meta = false } = modifier;

  const callbackRef = useLatest(callback);

  const documentRef = useDocument();

  useEventListener(
    documentRef,
    "keydown",
    (event) => {
      if (
        event.key !== key ||
        event.ctrlKey !== ctrl ||
        event.shiftKey !== shift ||
        event.altKey !== alt ||
        event.metaKey !== meta
      ) {
        return;
      }

      callbackRef.current(event);
    },
    { extraDeps: [key, ctrl, shift, alt, meta] },
  );
}

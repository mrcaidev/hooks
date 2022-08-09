import { useEventListener } from "./use-event-listener";

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
 * @param code - Code of target key.
 * @param listener - Event listener on key down events.
 * @param modifier - Modifier keys that should be pressed at the same time, defaults to `{}`.
 */
export function useKeydown(
  code: string,
  listener: (e: KeyboardEvent) => void,
  modifier: ModifierKeys = {}
) {
  const { ctrl = false, shift = false, alt = false, meta = false } = modifier;

  useEventListener(document, "keydown", (e) => {
    if (
      e.code === code &&
      e.ctrlKey === ctrl &&
      e.shiftKey === shift &&
      e.altKey === alt &&
      e.metaKey === meta
    ) {
      listener(e);
    }
  });
}

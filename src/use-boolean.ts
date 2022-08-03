import { useState } from "react";

/** Result of useBoolean. */
export interface UseBooleanResult {
  /** Current boolean value. */
  value: boolean;

  /** Set boolean value. */
  set: (value: boolean) => void;

  /** Toggle boolean value. */
  toggle: () => void;

  /** Set boolean value to true. */
  on: () => void;

  /** Set boolean value to false. */
  off: () => void;
}

/**
 * Use a boolean value.
 * @param initialValue - Initial boolean value, defaults to false.
 * @returns A boolean value, and functions to update it.
 */
export function useBoolean(initialValue = false): UseBooleanResult {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((value) => !value);
  const on = () => setValue(true);
  const off = () => setValue(false);

  return { value, set: setValue, toggle, on, off };
}

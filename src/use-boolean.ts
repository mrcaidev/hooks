import { useState } from "react";

/**
 * A boolean value, and functions to update it.
 */
export interface UseBooleanResult {
  /** Current boolean value. */
  value: boolean;

  /** Toggle the value. */
  toggle: () => void;

  /** Set the value to true. */
  on: () => void;

  /** Set the value to false. */
  off: () => void;
}

/**
 * Use a boolean value.
 *
 * @param initialValue - Initial boolean value, defaults to false.
 * @returns A boolean value, and functions to update it.
 */
export function useBoolean(initialValue = false): UseBooleanResult {
  const [value, setValue] = useState(initialValue);

  // Toggle.
  const toggle = () => setValue((value) => !value);

  // Turn on.
  const on = () => setValue(true);

  // Turn off.
  const off = () => setValue(false);

  return { value, toggle, on, off };
}

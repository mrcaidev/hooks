import { useState } from "react";

export interface UseBooleanResult {
  value: boolean;
  toggle: () => void;
  on: () => void;
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

  return { value, toggle, on, off };
}

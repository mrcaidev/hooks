import { useState } from "react";

/**
 * Use a boolean value.
 * @param initialValue - Initial boolean value, defaults to `false`.
 * @returns The boolean value, and some functions to update it.
 */
export function useBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((value) => !value);
  const on = () => setValue(true);
  const off = () => setValue(false);

  return { value, set: setValue, toggle, on, off };
}

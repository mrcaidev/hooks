import { useState } from "react";

/**
 * Use a boolean value.
 */
export function useBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const on = () => setValue(true);
  const off = () => setValue(false);
  const toggle = () => setValue((value) => !value);
  const reset = () => setValue(initialValue);

  return { value, set: setValue, on, off, toggle, reset };
}

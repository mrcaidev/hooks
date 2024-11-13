import { useState } from "react";

/**
 * Use a boolean value.
 */
export function useBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue((value) => !value);
  const reset = () => setValue(initialValue);

  return { value, set: setValue, setTrue, setFalse, toggle, reset };
}

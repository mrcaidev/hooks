import { useState } from "react";

/**
 * Use a boolean value.
 *
 * @param initialValue The initial value of the boolean.
 *
 * @returns An object containing the current value of the boolean and functions
 * to update it.
 */
export function useBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue((value) => !value);
  const reset = () => setValue(initialValue);

  return {
    /**
     * The current value of the boolean.
     */
    value,

    /**
     * Set the value to any boolean.
     */
    set: setValue,

    /**
     * Set the value to `true`.
     */
    setTrue,

    /**
     * Set the value to `false`.
     */
    setFalse,

    /**
     * Toggle the value, that is, to set the value to `true` if it is currently
     * `false`, and to `false` if it is currently `true`.
     */
    toggle,

    /**
     * Reset the value to the initial value.
     */
    reset,
  };
}

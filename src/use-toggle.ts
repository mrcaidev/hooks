import { useState } from "react";

/**
 * Use an either-or value.
 */
export function useToggle<const L, const R>(left: L, right: R) {
  const [value, setValue] = useState<L | R>(left);

  const setLeft = () => setValue(left);
  const setRight = () => setValue(right);
  const toggle = () => setValue((value) => (value === left ? right : left));

  return { value, set: setValue, setLeft, setRight, toggle };
}

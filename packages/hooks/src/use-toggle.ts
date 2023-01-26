import { useState } from "react";

/**
 * Use an either-or value.
 */
export function useToggle<L, R>(left: L, right: R) {
  const [value, setValue] = useState<L | R>(left);

  const toggle = () => setValue((value) => (value === left ? right : left));
  const setLeft = () => setValue(left);
  const setRight = () => setValue(right);

  return { value, set: setValue, toggle, setLeft, setRight };
}

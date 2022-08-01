import { useState } from "react";

export interface UseToggleOptions<L, R> {
  initialValue: L | R;
}

export interface UseToggleResult<L, R> {
  value: L | R;
  set: (value: L | R) => void;
  toggle: () => void;
  setLeft: () => void;
  setRight: () => void;
}

/**
 * Use an either-or value.
 * @param left - One chooseable value.
 * @param right - The other chooseable value.
 * @returns An either-or value, and functions to update it.
 */
export function useToggle<L, R>(
  left: L,
  right: R,
  options: UseToggleOptions<L, R> = { initialValue: left }
): UseToggleResult<L, R> {
  const { initialValue } = options;

  const [value, setValue] = useState<L | R>(initialValue);

  const toggle = () => setValue((value) => (value === left ? right : left));
  const setLeft = () => setValue(left);
  const setRight = () => setValue(right);

  return { value, set: setValue, toggle, setLeft, setRight };
}

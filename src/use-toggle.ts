import { useState } from "react";

/**
 * Options of useToggle.
 *
 * @public
 */
export interface UseToggleOptions<L, R> {
  /** Initial value. */
  initialValue: L | R;
}

/**
 * An either-or value, and functions to update it.
 *
 * @public
 */
export interface UseToggleResult<L, R> {
  /** Current value. */
  value: L | R;

  /** Set it to left or right. */
  set: (value: L | R) => void;

  /** Toggle the value. */
  toggle: () => void;

  /** Set the value to left. */
  setLeft: () => void;

  /** Set the value to right. */
  setRight: () => void;
}

/**
 * Use an either-or value.
 *
 * @param left - One chooseable value.
 * @param right - The other chooseable value.
 * @returns An either-or value, and functions to update it.
 *
 * @public
 */
export function useToggle<L, R>(
  left: L,
  right: R,
  options: UseToggleOptions<L, R> = { initialValue: left }
): UseToggleResult<L, R> {
  const { initialValue } = options;

  const [value, setValue] = useState<L | R>(initialValue);

  // Toggle.
  const toggle = () => setValue((value) => (value === left ? right : left));

  // Set to left.
  const setLeft = () => setValue(left);

  // Set to right.
  const setRight = () => setValue(right);

  return { value, set: setValue, toggle, setLeft, setRight };
}

import { useState } from "react";

/**
 * Use an either-or value.
 * @param left - The left-hand value.
 * @param right - The right-hand value.
 * @returns The either-or value, and some functions to update it.
 */
export function useToggle<L, R>(left: L, right: R) {
  const [isLeft, setIsLeft] = useState(true);

  const toggle = () => setIsLeft((isLeft) => !isLeft);
  const setLeft = () => setIsLeft(true);
  const setRight = () => setIsLeft(false);

  return { value: isLeft ? left : right, toggle, setLeft, setRight };
}

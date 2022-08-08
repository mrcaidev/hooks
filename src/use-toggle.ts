import { useState } from "react";

/**
 * Use an either-or value.
 * @param left - Left-hand value.
 * @param right - Right-hand value.
 * @returns An either-or value, and functions to update it.
 */
export function useToggle<L, R>(left: L, right: R) {
  const [isLeft, setIsLeft] = useState(true);

  const toggle = () => setIsLeft((isLeft) => !isLeft);
  const setLeft = () => setIsLeft(true);
  const setRight = () => setIsLeft(false);

  return { value: isLeft ? left : right, toggle, setLeft, setRight };
}

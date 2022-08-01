import { useRef } from "react";

/**
 * Use a constant value.
 * @param fn - A function to generate the constant value.
 * @returns A constant value.
 */
export function useConst<T>(fn: () => T): T {
  const ref = useRef<{ value: T }>();

  if (ref.current === undefined) {
    ref.current = { value: fn() };
  }

  return ref.current.value;
}

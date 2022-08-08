import { type RefObject } from "react";
import { isBrowser, isRef } from "./validator";

/** Real targets: elements, document, window. */
export type Target = HTMLElement | Document | Window | null | undefined;

/**
 * The real target, or the ref object containing that target.
 */
export type WithRef<T extends Target> = T | RefObject<T>;

/**
 * Get the native target out of a generalized target.
 * @param target A generalized target.
 * @returns A native target indicated by `target`.
 */
export function getTarget<T extends Target>(target: WithRef<T>) {
  if (!isBrowser()) {
    return undefined;
  }
  return isRef(target) ? target.current : target;
}

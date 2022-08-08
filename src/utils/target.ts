import { type RefObject } from "react";
import { isBrowser, isRef } from "./validator";

/** Real targets: document, elements, window. */
export type Target = Document | HTMLElement | Window | null | undefined;

/** The real target, or the ref object containing that target. */
export type WithRef<T extends Target> = T | RefObject<T>;

/**
 * Get the real target out of a generalized target.
 * @param withRefTarget A generalized target.
 * @returns The real target indicated by `target`,
 *          or `null` or `undefined` if not found.
 */
export function getTarget<T extends Target>(withRefTarget: WithRef<T>) {
  if (!isBrowser()) {
    return undefined;
  }
  return isRef(withRefTarget) ? withRefTarget.current : withRefTarget;
}

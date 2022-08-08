import { type MutableRefObject } from "react";
import { isBrowser, isRef } from "./validator";

/** Real target in DOM/BOM. */
export type NativeTarget = HTMLElement | Document | Window;

/**
 * Target in a broader sense:
 * - Either a native target, e.g. an element, a window, or a document.
 * - Or a ref object containing a native target.
 */
export type Target<T extends NativeTarget = Document> =
  | WithNullOrUndefined<T>
  | WithNullOrUndefined<MutableRefObject<T>>;

/**
 * Get the native target out of a generalized target.
 * @param target A generalized target.
 * @param defaultTarget Fallback native target, if native target is not found.
 * @returns A native target indicated by `target`.
 */
export function getNativeTarget<T extends NativeTarget>(
  target: Target<T>,
  defaultTarget: NativeTarget = document
) {
  if (!isBrowser() || !target) {
    return defaultTarget;
  }
  const nativeTarget = isRef(target) ? target.current : target;
  return nativeTarget;
}

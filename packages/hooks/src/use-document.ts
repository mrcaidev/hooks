import { useRef } from "react";

/**
 * Use `document` object.
 */
export function useDocument() {
  const ref = useRef(typeof document === "undefined" ? null : document);
  return ref;
}

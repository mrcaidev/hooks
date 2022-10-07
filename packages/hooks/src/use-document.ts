import { useRef } from "react";

/**
 * Use `document` object.
 */
export function useDocument() {
  const ref = useRef(typeof window === "undefined" ? null : document);
  return ref;
}

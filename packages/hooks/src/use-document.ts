import { useEffect, useRef } from "react";

/**
 * Use `document` object.
 */
export function useDocument() {
  const ref = useRef<Document | null>(null);

  useEffect(() => {
    ref.current = document;
  }, []);

  return ref;
}

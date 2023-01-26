import { useEffect, useRef } from "react";

/**
 * Use `window` object.
 */
export function useWindow() {
  const ref = useRef<Window | null>(null);

  useEffect(() => {
    ref.current = window;
  }, []);

  return ref;
}

import { useRef } from "react";
import { useMount } from "./use-mount";

/**
 * Use `window` object.
 */
export function useWindow() {
  const ref = useRef<Window | null>(null);

  useMount(() => {
    ref.current = window;
  });

  return ref;
}

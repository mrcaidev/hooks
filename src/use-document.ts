import { useRef } from "react";
import { useMount } from "./use-mount";

/**
 * Use `document` object.
 */
export function useDocument() {
  const ref = useRef<Document | null>(null);

  useMount(() => {
    ref.current = document;
  });

  return ref;
}

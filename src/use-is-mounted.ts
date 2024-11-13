import { useRef } from "react";
import { useMount } from "./use-mount";

/**
 * Check if the component is mounted.
 */
export function useIsMounted() {
  const isMountedRef = useRef(false);

  useMount(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  });

  return isMountedRef;
}

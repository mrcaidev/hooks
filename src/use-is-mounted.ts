import { useRef } from "react";
import { useMount } from "./use-mount";
import { useUnmount } from "./use-unmount";

/**
 * Check if the component is mounted.
 */
export function useIsMounted() {
  const isMountedRef = useRef(false);

  useMount(() => {
    isMountedRef.current = true;
  });

  useUnmount(() => {
    isMountedRef.current = false;
  });

  return isMountedRef;
}

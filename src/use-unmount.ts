import { useEffect } from "react";

/**
 * Trigger an effect just before the component is unmounted.
 */
export function useUnmount(cleanup: () => void) {
  useEffect(() => cleanup, []);
}

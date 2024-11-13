import { useEffect } from "react";

/**
 * Trigger an effect just before the component is unmounted.
 */
export function useUnmount(cleanup: () => void) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => cleanup, []);
}

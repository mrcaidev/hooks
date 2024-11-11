import { useEffect } from "react";

/**
 * Trigger effect before the component is unmounted.
 */
export function useUnmount(cleanup: () => void) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => cleanup, []);
}

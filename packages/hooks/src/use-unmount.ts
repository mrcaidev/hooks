import { useEffect } from "react";

/**
 * Run only on unmount.
 */
export function useUnmount(cleanup: () => void) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => cleanup, []);
}

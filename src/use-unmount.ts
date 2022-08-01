import { useEffect } from "react";

/**
 * Use unmount phase.
 * @param cleanup - Callback to run on unmount.
 */
export function useUnmount(cleanup: () => void) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => cleanup, []);
}

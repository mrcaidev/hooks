import { useEffect } from "react";

/**
 * Use unmount phase.
 * @param cleanup - A callback function to run on unmount phase.
 */
export function useUnmount(cleanup: () => void) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => cleanup, []);
}

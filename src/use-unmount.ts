import { useEffect } from "react";

/**
 * Use `ComponentWillUnmount`.
 *
 * @param cleanup - Callback to run on unmount.
 *
 * @public
 */
export function useUnmount(cleanup: () => void): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => cleanup, []);
}

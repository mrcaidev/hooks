import { useEffect } from "react";
import { useLatest } from "./use-latest";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (...args: any[]) => any;

/**
 * Run a function at a regular interval.
 */
export function useInterval(callback: Fn, timeout = 500) {
  const callbackRef = useLatest(callback);

  useEffect(() => {
    const timer = setInterval(callbackRef.current, timeout);
    return () => clearInterval(timer);
  }, [callbackRef, timeout]);
}

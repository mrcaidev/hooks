import { useEffect } from "react";
import { useLatest } from "./use-latest";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (...args: any[]) => any;

/**
 * Run a function after a timeout.
 */
export function useTimeout(fn: Fn, timeout = 500) {
  const callbackRef = useLatest(fn);

  useEffect(() => {
    const timer = setTimeout(callbackRef.current, timeout);
    return () => clearTimeout(timer);
  }, [callbackRef, timeout]);
}

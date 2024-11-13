import { useEffect } from "react";
import type { Fn } from "./types";
import { useLatest } from "./use-latest";

/**
 * Run a function at a regular interval.
 */
export function useInterval(fn: Fn, timeout = 500) {
  const fnRef = useLatest(fn);

  useEffect(() => {
    const timer = setInterval(fnRef.current, timeout);
    return () => clearInterval(timer);
  }, [timeout]);
}

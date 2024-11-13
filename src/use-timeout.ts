import { useEffect } from "react";
import type { Fn } from "./types";
import { useLatest } from "./use-latest";

/**
 * Run a function after a timeout.
 */
export function useTimeout(fn: Fn, timeout = 500) {
  const fnRef = useLatest(fn);

  useEffect(() => {
    const timer = setTimeout(fnRef.current, timeout);
    return () => clearTimeout(timer);
  }, [timeout]);
}

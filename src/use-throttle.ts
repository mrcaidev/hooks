import { useEffect, useRef, useState } from "react";
import { useUnmount } from "./use-unmount";

/** Options to specify the behavior of throttle. */
export interface UseThrottleOptions {
  /** Timeout (ms) before the value is updated, defaults to 500. */
  timeout?: number;

  /**
   * If `true`, the timer will immediately start after mounted.
   * If `false`, the timer will only start on dependency or option updates.
   * Defaults to `false`.
   */
  onMount?: boolean;
}

/**
 * Throttle a value.
 * @param value - The value to be throttled.
 * @param options - Options to specify the behavior of throttle.
 * @returns The throttled value.
 */
export function useThrottle<T>(value: T, options: UseThrottleOptions = {}) {
  const { timeout = 500, onMount = false } = options;

  const isMounted = useRef(false);
  const isCoolingDown = useRef(false);
  const [throttledValue, setThrottledValue] = useState(value);

  useEffect(() => {
    if (!onMount && !isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (isCoolingDown.current) return;

    setThrottledValue(value);

    isCoolingDown.current = true;
    setTimeout(() => {
      isCoolingDown.current = false;
    }, timeout);
  }, [value, timeout, onMount]);

  useUnmount(() => {
    isMounted.current = false;
  });

  return throttledValue;
}

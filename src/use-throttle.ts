import { useEffect, useRef, useState } from "react";
import { useUnmount } from "./use-unmount";
import { type TimeoutOptions } from "./utils/timeout";

/**
 * Throttle a value.
 * @param value - The value to be throttled.
 * @param options - An object that specifies the behavior of throttle,
 *                  defaults to `{}`.
 * @returns The throttled value.
 */
export function useThrottle<T>(value: T, options: TimeoutOptions = {}) {
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

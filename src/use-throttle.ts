import { useEffect, useRef, useState } from "react";

export type UseThrottleOptions = {
  timeout?: number;
  onMount?: boolean;
};

/**
 * Throttle a value.
 */
export function useThrottle<T>(value: T, options: UseThrottleOptions = {}) {
  const { timeout = 500, onMount = false } = options;

  const [throttledValue, setThrottledValue] = useState(value);

  const shouldSkipRef = useRef(true);

  const isCoolingDownRef = useRef(false);

  useEffect(() => {
    if (!onMount && shouldSkipRef.current) {
      shouldSkipRef.current = false;
      return;
    }

    if (isCoolingDownRef.current) {
      return;
    }

    setThrottledValue(value);

    isCoolingDownRef.current = true;
    setTimeout(() => {
      isCoolingDownRef.current = false;
    }, timeout);
  }, [value, timeout, onMount]);

  return throttledValue;
}

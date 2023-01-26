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

  const isJustMountedRef = useRef(true);
  const isCoolingDownRef = useRef(false);
  const [throttledValue, setThrottledValue] = useState(value);

  useEffect(() => {
    if (!onMount && isJustMountedRef.current) {
      isJustMountedRef.current = false;
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

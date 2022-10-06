import { useEffect, useRef, useState } from "react";

interface Options {
  timeout?: number;
  onMount?: boolean;
}

/**
 * Throttle a value.
 */
export function useThrottle<T>(value: T, options: Options = {}) {
  const { timeout = 500, onMount = false } = options;

  const isMountedRef = useRef(false);
  const isCoolingDownRef = useRef(false);
  const [throttledValue, setThrottledValue] = useState(value);

  useEffect(() => {
    if (!onMount && !isMountedRef.current) {
      isMountedRef.current = true;
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

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return throttledValue;
}

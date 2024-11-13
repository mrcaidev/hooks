import { useState } from "react";
import { useThrottleEffect } from "./use-throttle-effect";

export type UseThrottleOptions = {
  timeout?: number;
  onMount?: boolean;
};

/**
 * Throttle a value.
 */
export function useThrottle<T>(value: T, options: UseThrottleOptions = {}) {
  const [throttledValue, setThrottledValue] = useState(value);

  useThrottleEffect(() => setThrottledValue(value), [value], options);

  return throttledValue;
}

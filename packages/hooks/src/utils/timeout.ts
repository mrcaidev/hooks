/** An object that specifies the behavior of debounce or throttle. */
export interface TimeoutOptions {
  /** Timeout before action is triggered, defaults to 500. */
  timeout?: number;

  /**
   * If `true`, the timer will start immediately after mounted.
   * If `false`, the timer will start after first trigger.
   */
  onMount?: boolean;
}

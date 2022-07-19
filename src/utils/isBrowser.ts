/**
 * Check if current environment is browser.
 *
 * @returns `true` if in browser, or `false` otherwise.
 *
 * @internal
 */
export function isBrowser() {
  return typeof window !== "undefined";
}

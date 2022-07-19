import { useEffect, useState } from "react";

/**
 * Use the matching result of a media query.
 *
 * @param query - Media query expression.
 * @returns `true` if condition is matched, or `false` otherwise.
 *
 * @public
 */
export function useMediaQuery(query: string): boolean {
  const [isMatched, setIsMatched] = useState(false);

  // After the component is mounted.
  useEffect(() => {
    const target = matchMedia(query);

    // Execute media query, make its result the initial state.
    setIsMatched(target.matches);

    // Register a listener to watch media query result changes.
    const handleChange = (e: MediaQueryListEvent) => setIsMatched(e.matches);
    target.addEventListener("change", handleChange);

    // Unregister the listener when the component is unmounted.
    return () => target.removeEventListener("change", handleChange);
  }, [query]);

  return isMatched;
}

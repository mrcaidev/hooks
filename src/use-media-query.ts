import { useEffect, useState } from "react";

/**
 * Use the matching result of a media query.
 * @param query - A media query expression.
 * @returns `true` if condition is matched, or `false` otherwise.
 */
export function useMediaQuery(query: string) {
  const [isMatched, setIsMatched] = useState(false);

  useEffect(() => {
    const target = matchMedia(query);
    setIsMatched(target.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsMatched(e.matches);
    target.addEventListener("change", handleChange);

    return () => target.removeEventListener("change", handleChange);
  }, [query]);

  return isMatched;
}

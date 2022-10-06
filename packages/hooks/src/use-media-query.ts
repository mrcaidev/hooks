import { useEffect, useState } from "react";

/**
 * Manage the result of a media query.
 */
export function useMediaQuery(query: string) {
  const [isMatched, setIsMatched] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return matchMedia(query).matches;
  });

  useEffect(() => {
    const target = matchMedia(query);
    const handleChange = (e: MediaQueryListEvent) => setIsMatched(e.matches);

    target.addEventListener("change", handleChange);
    return () => target.removeEventListener("change", handleChange);
  }, [query]);

  return isMatched;
}

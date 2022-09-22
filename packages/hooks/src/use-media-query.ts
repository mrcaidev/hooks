import { useEffect, useState } from "react";

/**
 * Watch the result of a media query.
 * @param query - The media query expression.
 * @returns `true` if the condition is matched, or `false` otherwise.
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

import { useEffect, useRef, useState } from "react";
import { useEventListener } from "./use-event-listener";

/**
 * Use the result of a media query.
 */
export function useMediaQuery(query: string) {
  const [isMatched, setIsMatched] = useState(false);

  const mediaQueryListRef = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    const mediaQueryList = matchMedia(query);

    mediaQueryListRef.current = mediaQueryList;

    setIsMatched(mediaQueryList.matches);
  }, [query]);

  useEventListener(
    mediaQueryListRef,
    "change",
    (event) => setIsMatched(event.matches),
    { extraDeps: [query] },
  );

  return isMatched;
}

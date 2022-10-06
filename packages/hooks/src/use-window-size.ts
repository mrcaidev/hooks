import { useEffect, useState } from "react";

/**
 * Use the inner width and height of the window.
 */
export function useWindowSize() {
  const [width, setWidth] = useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }
    return innerWidth;
  });
  const [height, setHeight] = useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }
    return innerHeight;
  });

  useEffect(() => {
    const listener = () => {
      setWidth(innerWidth);
      setHeight(innerHeight);
    };

    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  return { width, height };
}

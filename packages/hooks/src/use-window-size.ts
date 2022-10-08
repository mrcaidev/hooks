import { useEffect, useState } from "react";

/**
 * Use the inner width and height of the window.
 */
export function useWindowSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const listener = () => {
      setWidth(innerWidth);
      setHeight(innerHeight);
    };
    listener();

    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  return { width, height };
}

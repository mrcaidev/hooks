import { useEffect, useState } from "react";
import { off, on } from "./utils/event";

/**
 * Use window's inner width and height.
 * @returns Window's inner width and height.
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
    on(window, "resize", listener);
    return () => off(window, "resize", listener);
  }, []);

  return { width, height };
}

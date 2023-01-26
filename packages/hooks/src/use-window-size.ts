import { useEffect, useState } from "react";
import { useEventListener } from "./use-event-listener";
import { useWindow } from "./use-window";

/**
 * Use the inner width and height of the window.
 */
export function useWindowSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const windowRef = useWindow();

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  useEventListener(windowRef, "resize", () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  });

  return { width, height };
}

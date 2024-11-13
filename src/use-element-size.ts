import { useEffect, useState, type RefObject } from "react";

/**
 * Use the size of an element.
 */
export function useElementSize(ref: RefObject<Element>) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const target = ref.current;

    if (!target) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) {
        return;
      }

      const { clientWidth, clientHeight } = entry.target;

      setWidth(clientWidth);
      setHeight(clientHeight);
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [ref]);

  return { width, height };
}

import { useEffect, useState, type RefObject } from "react";

export function useElementSize(ref: RefObject<HTMLElement>) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { clientWidth, clientHeight } = entry.target;
        setWidth(clientWidth);
        setHeight(clientHeight);
      });
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [ref]);

  return { width, height };
}

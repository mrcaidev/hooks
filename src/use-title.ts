import { useEffect, useState } from "react";

/**
 * Use page title.
 */
export function useTitle() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(document.title);

    const titleElement = document.querySelector("title");

    if (!titleElement) {
      return;
    }

    const observer = new MutationObserver(([mutation]) => {
      setTitle(mutation?.target.textContent ?? "");
    });

    observer.observe(titleElement, {
      subtree: true,
      characterData: true,
      childList: true,
    });

    return () => observer.disconnect();
  }, []);

  return title;
}

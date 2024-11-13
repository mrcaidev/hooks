import { useEffect, useState } from "react";

/**
 * Use page title.
 */
export function useTitle() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(document.title);

    const observer = new MutationObserver((mutations) => {
      setTitle(mutations[0]?.target.textContent ?? "");
    });

    observer.observe(document.querySelector("title")!, {
      subtree: true,
      characterData: true,
      childList: true,
    });

    return () => observer.disconnect();
  }, []);

  return title;
}

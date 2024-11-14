import { useState } from "react";
import { useMount } from "./use-mount";

/**
 * Use page title.
 */
export function useTitle() {
  const [title, setTitle] = useState("");

  useMount(() => {
    setTitle(document.title);
  });

  useMount(() => {
    const title = document.querySelector("title");

    if (!title) {
      return;
    }

    const observer = new MutationObserver(([mutation]) => {
      setTitle(mutation?.target.textContent ?? "");
    });

    observer.observe(title, {
      subtree: true,
      characterData: true,
      childList: true,
    });

    return () => observer.disconnect();
  });

  return title;
}

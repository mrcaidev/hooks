import { useEffect } from "react";

/**
 * Change page title.
 * @param title - The page title.
 */
export function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

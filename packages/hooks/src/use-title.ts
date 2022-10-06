import { useEffect } from "react";

/**
 * Manage page title.
 */
export function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

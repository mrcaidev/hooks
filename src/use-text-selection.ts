import { useEffect, useState } from "react";
import { useDocumentEventListener } from "./use-document-event-listener";

export type UseTextSelectionOptions = {
  sticky?: boolean;
};

/**
 * Use user's text selection.
 */
export function useTextSelection(options: UseTextSelectionOptions = {}) {
  const { sticky = false } = options;

  const [selection, setSelection] = useState("");

  useEffect(() => {
    setSelection(document.getSelection()?.toString() ?? "");
  }, []);

  useDocumentEventListener(
    "mouseup",
    () => {
      const selection = document.getSelection()?.toString() ?? "";

      if (!selection && sticky) {
        return;
      }

      setSelection(selection);
    },
    { extraDeps: [sticky] },
  );

  return selection;
}

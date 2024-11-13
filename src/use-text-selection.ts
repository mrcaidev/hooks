import { useEffect, useState } from "react";
import { useDocument } from "./use-document";
import { useEventListener } from "./use-event-listener";

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

  const documentRef = useDocument();

  useEventListener(
    documentRef,
    "mouseup",
    () => {
      const selection = document.getSelection()?.toString() ?? "";

      if (sticky && !selection) {
        return;
      }

      setSelection(selection);
    },
    { extraDeps: [sticky] },
  );

  return selection;
}

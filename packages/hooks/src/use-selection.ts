import { useState } from "react";
import { useDocument } from "./use-document";
import { useEventListener } from "./use-event-listener";

export type UseSelectionOptions = {
  sticky?: boolean;
};

export function useSelection(options: UseSelectionOptions = {}) {
  const { sticky = false } = options;

  const [selection, setSelection] = useState("");
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
    { extraDeps: [sticky] }
  );

  return selection;
}

import { useCallback, useEffect, useState } from "react";
import { useDocument } from "./use-document";
import { useEventListener } from "./use-event-listener";
import { toError } from "./utils";

export type UseClipboardTextOptions = {
  readOnMount?: boolean;
};

export function useClipboardText(options: UseClipboardTextOptions = {}) {
  const { readOnMount = true } = options;

  const [text, setText] = useState("");
  const [error, setError] = useState<Error | undefined>(undefined);

  const read = useCallback(async () => {
    try {
      setError(undefined);
      const text = await navigator.clipboard.readText();
      setText(text);
    } catch (err) {
      setError(toError(err));
    }
  }, []);

  useEffect(() => {
    if (!readOnMount) {
      return;
    }
    read();
  }, [readOnMount, read]);

  const documentRef = useDocument();
  useEventListener(documentRef, "cut", read);
  useEventListener(documentRef, "copy", read);

  const copy = async (text: string) => {
    try {
      setError(undefined);
      await navigator.clipboard.writeText(text);
      setText(text);
    } catch (err) {
      setError(toError(err));
    }
  };

  return { text, error, copy };
}

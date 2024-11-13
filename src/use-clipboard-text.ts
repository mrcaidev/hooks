import { useEffect, useState } from "react";
import { useDocumentEventListener } from "./use-document-event-listener";

export type UseClipboardTextOptions = {
  readOnMount?: boolean;
};

/**
 * Use the text on user's clipboard.
 */
export function useClipboardText(options: UseClipboardTextOptions = {}) {
  const { readOnMount = true } = options;

  const [text, setText] = useState("");

  const [error, setError] = useState<Error | null>(null);

  const read = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setText(text);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        return;
      }

      setError(new Error("Failed to read from clipboard", { cause: error }));
    }
  };

  const write = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setText(text);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        return;
      }

      setError(new Error("Failed to write to clipboard", { cause: error }));
    }
  };

  useEffect(() => {
    if (!readOnMount) {
      return;
    }

    read();
  }, [readOnMount]);

  useDocumentEventListener("cut", read);
  useDocumentEventListener("copy", read);

  // TODO: Visibility change event listener

  return { text, error, write };
}

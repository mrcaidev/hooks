import { useEffect, useState } from "react";
import { useDocumentEventListener } from "./use-document-event-listener";

/**
 * The options to configure the `useClipboardText` hook.
 */
export type UseClipboardTextOptions = {
  /**
   * Whether to immediately read the user's clipboard when the hook is mounted.
   *
   * If set to `false`, the returned `text` will be its default value, that is,
   * `""`.
   *
   * When this option is changed from `false` to `true`, the hook will read the
   * user's clipboard.
   *
   * @default true
   */
  readOnMount?: boolean;
};

/**
 * Use the text on the user's clipboard.
 *
 * @param options - The options to configure the hook.
 *
 * @returns An object containing the text on the user's clipboard, the error
 * occurred, and a function to write text to the clipboard.
 *
 * @see https://hooks.mrcai.dev/hooks/use-clipboard-text
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

  useDocumentEventListener("visibilitychange", (_, document) => {
    if (document.visibilityState === "visible") {
      read();
    }
  });

  return {
    /**
     * The text on the user's clipboard.
     */
    text,

    /**
     * The error that occurs while reading from or writing to the user's
     * clipboard.
     *
     * After any successful read or write operation, `error` will be reset to
     * `null`.
     */
    error,

    /**
     * Write text to the user's clipboard.
     */
    write,
  };
}

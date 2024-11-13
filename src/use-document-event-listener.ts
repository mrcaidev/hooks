import { useDocument } from "./use-document";
import {
  useEventListener,
  type UseEventListenerOptions,
} from "./use-event-listener";

/**
 * Listen to events on the `document` object.
 */
export function useDocumentEventListener<Type extends keyof DocumentEventMap>(
  type: Type,
  callback: (event: DocumentEventMap[Type], document: Document) => void,
  options: UseEventListenerOptions = {},
) {
  const documentRef = useDocument();

  useEventListener(documentRef, type, callback, options);
}

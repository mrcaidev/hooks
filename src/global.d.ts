/** Real targets: document, elements, window. */
type Target = Document | HTMLElement | Window;

/** Mapping between event name and event type. */
type EventMap = DocumentEventMap & HTMLElementEventMap & WindowEventMap;

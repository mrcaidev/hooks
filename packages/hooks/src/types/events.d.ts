// TODO: Add more event map mapping.
type EventMap<T> = T extends Document
  ? DocumentEventMap
  : T extends HTMLElement
  ? HTMLElementEventMap
  : T extends Window
  ? WindowEventMap
  : T extends MediaQueryList
  ? MediaQueryListEventMap
  : unknown;

type EventType<T> = Extract<keyof EventMap<T>, string>;

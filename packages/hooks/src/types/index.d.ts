// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (...args: any) => any;

type EventMap<T> = T extends Document
  ? DocumentEventMap
  : T extends HTMLElement
  ? HTMLElementEventMap
  : T extends Window
  ? WindowEventMap
  : T extends MediaQueryList
  ? MediaQueryListEventMap
  : unknown;

type EventType<T> = Exclude<keyof EventMap<T>, number | symbol>;

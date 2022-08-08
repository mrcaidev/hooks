/**
 * A collection of React utility hooks.
 * @packageDocumentation
 */

export { useBoolean } from "./use-boolean";
export { useClickOutside } from "./use-click-outside";
export { useConst } from "./use-const";
export { useConstFn } from "./use-const-fn";
export { useCounter } from "./use-counter";
export {
  useEventListener,
  type EventMap,
  type UseEventListenerOptions,
} from "./use-event-listener";
export { useFocusTrap } from "./use-focus-trap";
export { useHover, type UseHoverOptions } from "./use-hover";
export { useKeydown, type ModifierKeys } from "./use-keydown";
export {
  useLocalStorage,
  type UseLocalStorageOptions,
} from "./use-local-storage";
export { useMediaQuery } from "./use-media-query";
export { useMount } from "./use-mount";
export { useRerender } from "./use-rerender";
export {
  useSessionStorage,
  type UseSessionStorageOptions,
} from "./use-session-storage";
export { useStorage, type UseStorageOptions } from "./use-storage";
export { useTheme, type Theme, type UseThemeOptions } from "./use-theme";
export { useToggle } from "./use-toggle";
export { useUnmount } from "./use-unmount";
export { useUpdate } from "./use-update";
export { type Target, type WithRef } from "./utils/target";

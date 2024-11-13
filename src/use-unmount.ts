import { useMount } from "./use-mount";

/**
 * Trigger an effect just before the component is unmounted.
 */
export function useUnmount(cleanup: () => void) {
  useMount(() => cleanup);
}

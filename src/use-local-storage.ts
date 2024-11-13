import { useStorage, type UseStorageOptions } from "./use-storage";

export type UseLocalStorageOptions<T> = Omit<UseStorageOptions<T>, "type">;

/**
 * Use local storage.
 */
export function useLocalStorage<T>(
  key: string,
  options: UseLocalStorageOptions<T> = {},
) {
  return useStorage<T>(key, { type: "local", ...options });
}

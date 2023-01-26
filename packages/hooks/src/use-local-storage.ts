import { useStorage, type UseStorageOptions } from "./use-storage";

export type UseLocalStorageOptions<T> = Omit<
  UseStorageOptions<T>,
  "storageName"
>;

/**
 * Manage local storage.
 */
export function useLocalStorage<T>(
  key: string,
  options: UseLocalStorageOptions<T> = {}
) {
  return useStorage<T>(key, { storageName: "localStorage", ...options });
}

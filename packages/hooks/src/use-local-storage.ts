import { useStorage, type UseStorageOptions } from "./use-storage";

type Options<T> = Omit<UseStorageOptions<T>, "storageName">;

/**
 * Manage local storage.
 */
export function useLocalStorage<T>(key: string, options: Options<T> = {}) {
  return useStorage<T>(key, { storageName: "localStorage", ...options });
}

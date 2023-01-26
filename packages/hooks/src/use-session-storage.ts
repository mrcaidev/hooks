import { useStorage, type UseStorageOptions } from "./use-storage";

type Options<T> = Omit<UseStorageOptions<T>, "storageName">;

/**
 * Manage session storage.
 */
export function useSessionStorage<T>(key: string, options: Options<T> = {}) {
  return useStorage<T>(key, { storageName: "sessionStorage", ...options });
}

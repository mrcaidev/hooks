import { useStorage, type UseStorageOptions } from "./use-storage";

export type UseSessionStorageOptions<T> = Omit<
  UseStorageOptions<T>,
  "storageName"
>;

/**
 * Manage session storage.
 */
export function useSessionStorage<T>(
  key: string,
  options: UseSessionStorageOptions<T> = {},
) {
  return useStorage<T>(key, { storageName: "sessionStorage", ...options });
}

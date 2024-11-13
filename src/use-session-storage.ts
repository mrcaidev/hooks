import { useStorage, type UseStorageOptions } from "./use-storage";

export type UseSessionStorageOptions<T> = Omit<UseStorageOptions<T>, "type">;

/**
 * Use session storage.
 */
export function useSessionStorage<T>(
  key: string,
  options: UseSessionStorageOptions<T> = {},
) {
  return useStorage<T>(key, { type: "session", ...options });
}

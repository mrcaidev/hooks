import { useStorage, type UseStorageOptions } from "./use-storage";
import { isBrowser } from "./utils/validator";

/** Options to interact with session storage. */
export type UseSessionStorageOptions<T> = Omit<UseStorageOptions<T>, "storage">;

/**
 * Use session storage.
 * @param key - Key of session storage item.
 * @param options - Options to interact with session storage.
 * @returns Value of session storage item, and a function to update it.
 */
export function useSessionStorage<T>(
  key: string,
  options?: UseSessionStorageOptions<T>
) {
  return useStorage<T>(key, {
    storage: isBrowser() ? sessionStorage : undefined,
    ...(options ?? {}),
  });
}

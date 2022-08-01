import {
  useStorage,
  type UseStorageOptions,
  type UseStorageResult,
} from "./use-storage";
import { isBrowser } from "./utils/isBrowser";

export type UseLocalStorageOptions<T> = Omit<UseStorageOptions<T>, "storage">;
export type UseLocalStorageResult<T> = UseStorageResult<T>;

/**
 * Use local storage.
 * @param key - Key of local storage item.
 * @param options - Options to interact with local storage.
 * @returns Value of local storage item, and a function to update it.
 */
export function useLocalStorage<T>(
  key: string,
  options?: UseLocalStorageOptions<T>
): UseLocalStorageResult<T> {
  return useStorage<T>(key, {
    storage: isBrowser() ? localStorage : undefined,
    ...(options ?? {}),
  });
}

import {
  useStorage,
  type UseStorageOptions,
  type UseStorageResult,
} from "./use-storage";
import { isBrowser } from "./utils/isBrowser";

/**
 * Options to interact with local storage.
 *
 * @public
 */
export type UseLocalStorageOptions<T> = Omit<UseStorageOptions<T>, "storage">;

/**
 * Contains current stored value, and a function to update it.
 *
 * @public
 */
export type UseLocalStorageResult<T> = UseStorageResult<T>;

/**
 * Use local storage value.
 *
 * @param key - Key of local storage item.
 * @param options - Options to interact with local storage.
 * @returns Value of local storage item, and a function to update it.
 *
 * @public
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

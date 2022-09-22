import { useStorage } from "./use-storage";

/** Options to interact with local storage. */
export interface UseLocalStorageOptions<T> {
  /** Default state if the item does not yet exist. */
  defaultValue?: T;

  /** A function to serialize value T into string. */
  serializer?: (value: T) => string;

  /** A function to deserialize string into value T. */
  deserializer?: (value: string) => T;
}

/**
 * Use local storage.
 * @param key - Key of local storage item.
 * @param options - An object that specifies how to interact with local storage,
 *                  defaults to `{}`.
 * @returns The value of local storage item, and some functions to update it.
 */
export function useLocalStorage<T>(
  key: string,
  options?: UseLocalStorageOptions<T>
) {
  return useStorage<T>(key, {
    storageType: "localStorage",
    ...(options ?? {}),
  });
}

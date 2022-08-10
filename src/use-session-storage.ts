import { useStorage } from "./use-storage";

/** Options to interact with session storage. */
export interface UseSessionStorageOptions<T> {
  /** Default state if the item does not yet exist. */
  defaultValue?: T;

  /** A function to serialize value T into string. */
  serializer?: (value: T) => string;

  /** A function to deserialize string into value T. */
  deserializer?: (value: string) => T;
}

/**
 * Use session storage.
 * @param key - Key of session storage item.
 * @param options - An object that specifies how to interact with session storage,
 *                  defaults to `{}`.
 * @returns The value of session storage item, and some functions to update it.
 */
export function useSessionStorage<T>(
  key: string,
  options?: UseSessionStorageOptions<T>
) {
  return useStorage<T>(key, {
    storageType: "sessionStorage",
    ...(options ?? {}),
  });
}

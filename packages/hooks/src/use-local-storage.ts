import { useStorage } from "./use-storage";

interface Options<T> {
  defaultValue?: T;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

/**
 * Manage local storage.
 */
export function useLocalStorage<T>(key: string, options?: Options<T>) {
  return useStorage<T>(key, {
    storageType: "localStorage",
    ...(options ?? {}),
  });
}

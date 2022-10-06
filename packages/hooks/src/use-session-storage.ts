import { useStorage } from "./use-storage";

interface Options<T> {
  defaultValue?: T;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

/**
 * Manage session storage.
 */
export function useSessionStorage<T>(key: string, options?: Options<T>) {
  return useStorage<T>(key, {
    storageType: "sessionStorage",
    ...(options ?? {}),
  });
}

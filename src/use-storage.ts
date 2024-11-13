import { useEffect, useState } from "react";
import { useLatest } from "./use-latest";

export type StorageType = "local" | "session";

export type UseStorageOptions<T> = {
  type: StorageType;
  defaultValue?: T | undefined;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
};

/**
 * Manage storage.
 */
export function useStorage<T>(key: string, options: UseStorageOptions<T>) {
  const {
    type,
    defaultValue = undefined,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
  } = options;

  const [value, setValue] = useState(defaultValue);

  const deserializerRef = useLatest(deserializer);

  useEffect(() => {
    try {
      const storage = chooseStorage(type);

      const value = storage.getItem(key);

      if (value === null) {
        setValue(defaultValue);
        return;
      }

      const storedValue = deserializerRef.current(value);

      setValue(storedValue);
    } catch {
      setValue(defaultValue);
    }
  }, [key, type, defaultValue, deserializerRef]);

  const set: typeof setValue = (action) => {
    try {
      const storage = chooseStorage(type);

      const newValue = action instanceof Function ? action(value) : action;

      if (newValue === undefined) {
        storage.removeItem(key);

        setValue(defaultValue);

        return;
      }

      storage.setItem(key, serializer(newValue));

      setValue(newValue);
    } catch {
      return;
    }
  };

  const remove = () => set(undefined);

  return { value, set, remove };
}

function chooseStorage(type: StorageType) {
  switch (type) {
    case "local":
      return localStorage;
    case "session":
      return sessionStorage;
  }
}

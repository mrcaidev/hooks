import { useEffect, useState } from "react";
import { useLatest } from "./use-latest";

export type StorageType = "local" | "session";

export type UseStorageOptions<T> = {
  type: StorageType;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
};

/**
 * Use storage.
 */
export function useStorage<T>(key: string, options: UseStorageOptions<T>) {
  const {
    type,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
  } = options;

  const [value, setValue] = useState<T | null>(null);

  const deserializerRef = useLatest(deserializer);

  useEffect(() => {
    try {
      const storage = chooseStorage(type);

      const value = storage.getItem(key);

      if (value === null) {
        setValue(null);
        return;
      }

      const storedValue = deserializerRef.current(value);

      setValue(storedValue);
    } catch {
      setValue(null);
    }
  }, [key, type, deserializerRef]);

  const set: typeof setValue = (action) => {
    try {
      const storage = chooseStorage(type);

      const newValue = action instanceof Function ? action(value) : action;

      if (newValue === null) {
        storage.removeItem(key);
      } else {
        storage.setItem(key, serializer(newValue));
      }

      setValue(newValue);
    } catch {
      return;
    }
  };

  const remove = () => set(null);

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

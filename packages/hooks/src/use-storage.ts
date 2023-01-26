import { useEffect, useState } from "react";
import { useLatest } from "./use-latest";

type StorageName = "localStorage" | "sessionStorage";

export type UseStorageOptions<T> = {
  storageName: StorageName;
  defaultValue?: T | undefined;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
};

/**
 * Manage storage.
 */
export function useStorage<T>(key: string, options: UseStorageOptions<T>) {
  const {
    storageName,
    defaultValue = undefined,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
  } = options;

  const storage = getStorage(storageName);

  const [value, setValue] = useState(defaultValue);
  const deserializerRef = useLatest(deserializer);

  useEffect(() => {
    const storedValue = getItem<T>(key, {
      storage,
      deserializer: deserializerRef.current,
    });
    setValue(storedValue ?? defaultValue);
  }, [key, storage, defaultValue, deserializerRef]);

  const set: typeof setValue = (action) => {
    const newValue = action instanceof Function ? action(value) : action;
    setItem(key, newValue, { storage, serializer });
    setValue(newValue);
  };

  const remove = () => set(undefined);

  return { value, set, remove };
}

function getStorage(storageName: StorageName) {
  try {
    const map = { localStorage, sessionStorage };
    return map[storageName];
  } catch {
    return undefined;
  }
}

type GetItemOptions<T> = {
  storage: Storage | undefined;
  deserializer: (value: string) => T;
};

function getItem<T>(key: string, options: GetItemOptions<T>) {
  const { storage, deserializer } = options;

  if (!storage) {
    return null;
  }

  try {
    const value = storage.getItem(key);
    if (value === null) {
      return null;
    }
    return deserializer(value);
  } catch {
    return null;
  }
}

type SetItemOptions<T> = {
  storage: Storage | undefined;
  serializer: (value: T) => string;
};

function setItem<T>(key: string, value: T, options: SetItemOptions<T>) {
  const { storage, serializer } = options;

  if (!storage) {
    return;
  }

  try {
    if (value === undefined) {
      storage.removeItem(key);
      return;
    }
    storage.setItem(key, serializer(value));
  } catch {
    return;
  }
}

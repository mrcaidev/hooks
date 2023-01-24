import { useEffect, useState } from "react";

interface Options<T> {
  storageType: StorageType;
  defaultValue?: T;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

/**
 * Manage storage.
 */
export function useStorage<T>(key: string, options: Options<T>) {
  const {
    storageType,
    defaultValue = undefined as unknown as T,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
  } = options;

  const storage = getStorage(storageType);

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const storedValue = getItem(key, { storage, defaultValue, deserializer });
    setValue(storedValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, defaultValue]);

  const setValueWrapper: typeof setValue = (action) => {
    const newValue = action instanceof Function ? action(value) : action;
    setValue(newValue);
    setItem(key, newValue, { storage, serializer });
  };

  const remove = () => {
    setValue(undefined as unknown as T);
    removeItem(key, { storage });
  };

  return { value, set: setValueWrapper, remove };
}

type StorageType = "localStorage" | "sessionStorage";

function getStorage(type: StorageType) {
  if (typeof document === "undefined") {
    return undefined;
  }

  try {
    switch (type) {
      case "localStorage":
        return localStorage;
      case "sessionStorage":
        return sessionStorage;
      default:
        return undefined;
    }
  } catch {
    return undefined;
  }
}

interface GetItemOptions<T> {
  storage: Storage | undefined;
  defaultValue: T;
  deserializer: (value: string) => T;
}

function getItem<T>(key: string, options: GetItemOptions<T>) {
  const { storage, defaultValue, deserializer } = options;

  try {
    const value = storage?.getItem(key) ?? null;
    return value === null ? defaultValue : deserializer(value);
  } catch {
    return defaultValue;
  }
}

interface SetItemOptions<T> {
  storage: Storage | undefined;
  serializer: (value: T) => string;
}

function setItem<T>(key: string, value: T, options: SetItemOptions<T>) {
  const { storage, serializer } = options;

  try {
    if (value === undefined) {
      storage?.removeItem(key);
    } else {
      storage?.setItem(key, serializer(value));
    }
  } catch {
    return;
  }
}

interface RemoveItemOptions {
  storage: Storage | undefined;
}

function removeItem(key: string, options: RemoveItemOptions) {
  const { storage } = options;

  try {
    storage?.removeItem(key);
  } catch (err) {
    return;
  }
}

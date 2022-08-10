import { isBrowser } from "./validator";

export type StorageType = "localStorage" | "sessionStorage";

export function getStorage(type: StorageType) {
  if (!isBrowser()) return undefined;

  try {
    switch (type) {
      case "localStorage":
        return localStorage;
      case "sessionStorage":
        return sessionStorage;
      default:
        return undefined;
    }
  } catch (err) {
    return undefined;
  }
}

interface GetItemOptions<T> {
  storage: Storage | undefined;
  defaultValue: T;
  deserializer: (value: string) => T;
}

export function getItem<T>(key: string, options: GetItemOptions<T>) {
  const { storage, defaultValue, deserializer } = options;

  try {
    const value = storage?.getItem(key) ?? null;
    return value === null ? defaultValue : deserializer(value);
  } catch (err) {
    return defaultValue;
  }
}

interface SetItemOptions<T> {
  storage: Storage | undefined;
  serializer: (value: T) => string;
}

export function setItem<T>(key: string, value: T, options: SetItemOptions<T>) {
  const { storage, serializer } = options;

  try {
    if (value === undefined) {
      storage?.removeItem(key);
    } else {
      storage?.setItem(key, serializer(value));
    }
  } catch (err) {
    return;
  }
}

interface RemoveItemOptions {
  storage: Storage | undefined;
}

export function removeItem(key: string, options: RemoveItemOptions) {
  const { storage } = options;

  try {
    storage?.removeItem(key);
  } catch (err) {
    return;
  }
}

import { useEffect, useState } from "react";
import {
  getItem,
  getStorage,
  removeItem,
  setItem,
  type StorageType,
} from "./utils/storage";

/** Options to interact with storage objects. */
export interface UseStorageOptions<T> {
  /** Type of storage. */
  storageType: StorageType;

  /** Default state if the item does not yet exist. */
  defaultValue?: T;

  /** A function to serialize value T into string. */
  serializer?: (value: T) => string;

  /** A function to deserialize string into value T. */
  deserializer?: (value: string) => T;
}

/**
 * Use storage.
 * @param key - Key of storage item.
 * @param options - Options to interact with storage.
 * @returns The value of storage item, and a function to update it.
 */
export function useStorage<T>(key: string, options: UseStorageOptions<T>) {
  const {
    storageType,
    defaultValue = undefined as any as T,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
  } = options;

  const storage = getStorage(storageType);

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const storedValue = getItem(key, { storage, defaultValue, deserializer });
    setValue(storedValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValueWrapper: typeof setValue = (action) => {
    const newValue = action instanceof Function ? action(value) : action;
    setValue(newValue);
    setItem(key, newValue, { storage, serializer });
  };

  const remove = () => {
    setValue(undefined as any as T);
    removeItem(key, { storage });
  };

  return { value, set: setValueWrapper, remove };
}

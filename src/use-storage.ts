import { useEffect, useState } from "react";

/** Options to interact with storage objects. */
export interface UseStorageOptions<T> {
  /** Storage type, either `localStorage` or `sessionStorage`. */
  storage: Storage | undefined;

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
    storage,
    defaultValue = undefined as any as T,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
  } = options;

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const storedValue = getStorage(key, {
      storage,
      defaultValue,
      deserializer,
    });
    setValue(storedValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValueWrapper: typeof setValue = (action) => {
    const newValue = action instanceof Function ? action(value) : action;
    setValue(newValue);
    setStorage(key, newValue, { storage, serializer });
  };

  const remove = () => {
    setValue(undefined as any as T);
    removeStorage(key, { storage });
  };

  return { value, set: setValueWrapper, remove };
}

type GetStorageOptions<T> = Required<
  Pick<UseStorageOptions<T>, "storage" | "defaultValue" | "deserializer">
>;

function getStorage<T>(key: string, options: GetStorageOptions<T>) {
  const { storage, defaultValue, deserializer } = options;

  try {
    const value = storage?.getItem(key);
    return value === null || value === undefined
      ? defaultValue
      : deserializer(value);
  } catch (err) {
    console.error(err);
    return defaultValue;
  }
}

type SetStorageOptions<T> = Required<
  Pick<UseStorageOptions<T>, "storage" | "serializer">
>;

function setStorage<T>(key: string, value: T, options: SetStorageOptions<T>) {
  const { storage, serializer } = options;

  try {
    if (value === undefined) {
      storage?.removeItem(key);
    } else {
      storage?.setItem(key, serializer(value));
    }
  } catch (err) {
    console.error(err);
  }
}

type RemoveStorageOptions = Required<Pick<UseStorageOptions<any>, "storage">>;

function removeStorage(key: string, options: RemoveStorageOptions) {
  const { storage } = options;

  try {
    storage?.removeItem(key);
  } catch (err) {
    console.error(err);
  }
}

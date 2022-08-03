import { useEffect, useState } from "react";

/** Options to interact with storage objects. */
export interface UseStorageOptions<T> {
  /** Storage type, either `localStorage` or `sessionStorage`. */
  storage: Storage | undefined;

  /** Default state if value does not yet exist. */
  defaultValue?: T;

  /** A function to serialize value T into string. */
  serializer?: (value: T) => string;

  /** A function to deserialize string into value T. */
  deserializer?: (value: string) => T;
}

/** Result of useStorage. */
export interface UseStorageResult<T> {
  /**
   * Current value of local storage,
   * or default value if local storage does not yet has this item.
   */
  value: T;

  /** Set value in both state and local storage. */
  set: (value: T) => void;

  /** Remove value in local storage, and set state to `undefined`. */
  remove: () => void;
}

/**
 * Use storage value.
 * @param key - Key of storage item.
 * @param options - Options to interact with storage.
 * @returns Value of storage item, and a function to update it.
 */
export function useStorage<T>(
  key: string,
  options: UseStorageOptions<T>
): UseStorageResult<T> {
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
    setStorage(key, undefined, { storage, serializer });
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

import { useEffect, useState, type SetStateAction } from "react";

/**
 * Options to interact with storage.
 */
export interface UseStorageOptions<T> {
  /** Storage to use. */
  storage: Storage | undefined;

  /** Default value if key is not found. */
  defaultValue?: T;

  /** A function to serialize target object into string. */
  serializer?: (value: T) => string;

  /** A function to deserialize string into target object. */
  deserializer?: (value: string) => T;
}

/**
 * Contains current stored value, and a function to update it.
 */
export interface UseStorageResult<T> {
  value: T;
  set: (value: SetStateAction<T>) => void;
  remove: () => void;
}

/**
 * Use storage value.
 *
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

  // Manage storage value as a state.
  const [value, setValue] = useState(defaultValue);

  // After component is mounted.
  useEffect(() => {
    // Update state with current stored value.
    const storedValue = getter(key, {
      storage,
      defaultValue,
      deserializer,
    });
    setValue(storedValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Every time the value updates, update storage simultaneously.
  const setValueWrapper = (action: SetStateAction<T>) => {
    const newValue = action instanceof Function ? action(value) : action;
    setValue(newValue);
    setter(key, newValue, { storage, serializer });
  };

  // Set value to `undefined` will remove the item.
  const remove = () => {
    setValue(undefined as any as T);
    setter(key, undefined, { storage, serializer });
  };

  return { value, set: setValueWrapper, remove };
}

/** Options to get storage value. */
type GetterOptions<T> = Required<
  Pick<UseStorageOptions<T>, "storage" | "defaultValue" | "deserializer">
>;

/**
 * Get storage value.
 *
 * @param key - Key of storage item.
 * @returns Deserialized value, or `undefined` if key is not found.
 */
export function getter<T>(key: string, options: GetterOptions<T>) {
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

/** Options to set storage value. */
type SetterOptions<T> = Required<
  Pick<UseStorageOptions<T>, "storage" | "serializer">
>;

/**
 * Set storage value.
 *
 * @param key - Key of storage item.
 * @param value - New value.
 */
export function setter<T>(key: string, value: T, options: SetterOptions<T>) {
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

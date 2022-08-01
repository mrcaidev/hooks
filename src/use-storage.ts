import { useEffect, useState, type SetStateAction } from "react";

export interface UseStorageOptions<T> {
  storage: Storage | undefined;
  defaultValue?: T;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

export interface UseStorageResult<T> {
  value: T;
  set: (value: SetStateAction<T>) => void;
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
    const storedValue = getter(key, {
      storage,
      defaultValue,
      deserializer,
    });
    setValue(storedValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValueWrapper = (action: SetStateAction<T>) => {
    const newValue = action instanceof Function ? action(value) : action;
    setValue(newValue);
    setter(key, newValue, { storage, serializer });
  };

  const remove = () => {
    setValue(undefined as any as T);
    setter(key, undefined, { storage, serializer });
  };

  return { value, set: setValueWrapper, remove };
}

type GetterOptions<T> = Required<
  Pick<UseStorageOptions<T>, "storage" | "defaultValue" | "deserializer">
>;

function getter<T>(key: string, options: GetterOptions<T>) {
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

type SetterOptions<T> = Required<
  Pick<UseStorageOptions<T>, "storage" | "serializer">
>;

function setter<T>(key: string, value: T, options: SetterOptions<T>) {
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

/**
 * This object holds values set by the {@link mockLocalStorage} object.
 */
const _MOCK_LOCAL_STORAGE: Record<string, string> = {};

/**
 * This symbol is used in the {@link mockLocalStorage.setItem} method to correctly detect when the
 * required `value` param has not been provided. This is necessary because values like `undefined`
 * and `null` are valid values to set in localStorage.
 */
const MISSING_VALUE_SYM = Symbol("mockLocalStorage.setItem missing value symbol");

/**
 * Mock {@link Storage|localStorage} helper which returns the exact error message thrown by real
 * localStorage methods.
 */
const getLocalStorageErrMsg = (
  methodName: "setItem" | "getItem" | "removeItem" | "key", // excludes methods with zero params
  numArgsPresent: number = 0
): string => {
  const numArgsRequired = methodName === "setItem" ? 2 : 1;
  return (
    `Failed to execute '${methodName}' on 'Storage': ` +
    `${numArgsRequired} arguments required, but only ${numArgsPresent} present.`
  );
};

/**
 * Mock {@link Storage|localStorage} object.
 */
export const mockLocalStorage = Object.defineProperties(
  {},
  {
    setItem: {
      value: (key: unknown, value: unknown = MISSING_VALUE_SYM) => {
        if (typeof key !== "string") throw new TypeError(getLocalStorageErrMsg("setItem"));
        if (value === MISSING_VALUE_SYM) throw new TypeError(getLocalStorageErrMsg("setItem", 1));

        _MOCK_LOCAL_STORAGE[key] = String(value);
      },
    },
    getItem: {
      value: (key: unknown): string | null => {
        if (typeof key !== "string") throw new TypeError(getLocalStorageErrMsg("getItem"));

        return _MOCK_LOCAL_STORAGE[key] ?? null;
      },
    },
    removeItem: {
      value: (key: unknown) => {
        if (typeof key !== "string") throw new TypeError(getLocalStorageErrMsg("removeItem"));

        if (Object.hasOwn(_MOCK_LOCAL_STORAGE, key)) {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete _MOCK_LOCAL_STORAGE[key];
        }
      },
    },
    clear: {
      value: () => {
        for (const key in _MOCK_LOCAL_STORAGE) {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete _MOCK_LOCAL_STORAGE[key];
        }
      },
    },
    length: {
      get: () => Object.keys(_MOCK_LOCAL_STORAGE).length,
    },
    key: {
      value: (index: number): string | null => {
        if (typeof index !== "number") throw new TypeError(getLocalStorageErrMsg("key"));

        const keys = Object.keys(_MOCK_LOCAL_STORAGE);
        return keys[index] ?? null;
      },
    },
  }
) as typeof localStorage;

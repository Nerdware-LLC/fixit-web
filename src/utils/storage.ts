import { logger } from "./logger";
import { getTypeSafeErr } from "./typeSafety";

const STORAGE_KEYS = ["authToken", "checkoutValues", "preferredTheme"] as const;

/**
 * For each key managed by the `storage` util, the key is made available on the
 * storage object along with localStorage wrappers, `set()`, `get()`, and
 * `remove()`, along with shorthand equivalent methods:
 * ```ts
 * storage.myStorageKey.set("foo");
 * storage.myStorageKey.get(); // returns "foo"
 * storage.myStorageKey.remove();
 * // The above method calls are equivalent to their pre-existing counterparts:
 * storage.setMyStorageKey("foo");
 * storage.getMyStorageKey(); // returns "foo"
 * storage.removeMyStorageKey();
 * ```
 */
export const storage = STORAGE_KEYS.reduce(
  (accum, storageKey) => {
    accum[storageKey] = {
      set: (input: unknown) => {
        try {
          const valueToStore = typeof input === "string" ? input : JSON.stringify(input);
          return localStorage.setItem(storageKey, valueToStore);
        } catch (err) {
          logger.error(getTypeSafeErr(err), `utils.storage.set${capKey}`);
        }
      },
      get: () => localStorage.getItem(storageKey),
      remove: () => localStorage.removeItem(storageKey)
    };

    // prettier-ignore
    const capKey = `${storageKey.charAt(0).toUpperCase()}${storageKey.slice(1)}` as Capitalize<typeof storageKey>;

    accum[`set${capKey}`] = accum[storageKey].set;
    accum[`get${capKey}`] = accum[storageKey].get;
    accum[`remove${capKey}`] = accum[storageKey].remove;

    return accum;
  },
  { KEYS: STORAGE_KEYS } as StorageManager
);

type StorageManager = {
  KEYS: typeof STORAGE_KEYS;
} & {
  [K in typeof STORAGE_KEYS[number] as K]: StorageKeyMethods;
} & {
  [K in typeof STORAGE_KEYS[number] as `set${Capitalize<string & K>}`]: (input: unknown) => void;
} & {
  [K in typeof STORAGE_KEYS[number] as `get${Capitalize<string & K>}`]: () => string | null;
} & {
  [K in typeof STORAGE_KEYS[number] as `remove${Capitalize<string & K>}`]: () => void;
};

type StorageKeyMethods = {
  set: (input: unknown) => void;
  get: () => string | null;
  remove: () => void;
};

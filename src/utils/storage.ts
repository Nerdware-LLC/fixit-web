import { logger } from "./logger";
import { getTypeSafeErr } from "./typeSafety";

const STORAGE_KEY_NAMES = ["authToken", "checkoutValues"] as const;

export const storage = STORAGE_KEY_NAMES.reduce((accum, storageKeyName) => {
  const storageKey = `@${storageKeyName}`;
  // prettier-ignore
  const capKeyName = `${storageKeyName.charAt(0).toUpperCase()}${storageKeyName.slice(1)}` as Capitalize<typeof storageKeyName>;

  accum[`set${capKeyName}`] = (input: unknown) => {
    try {
      const valueToStore = typeof input === "string" ? input : JSON.stringify(input);
      return localStorage.setItem(storageKey, valueToStore);
    } catch (err) {
      logger.error(getTypeSafeErr(err), `utils.storage.set${capKeyName}`);
    }
  };

  accum[`get${capKeyName}`] = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch (err) {
      logger.error(getTypeSafeErr(err), `utils.storage.get${capKeyName}`);
    }
  };

  accum[`remove${capKeyName}`] = () => {
    try {
      return localStorage.removeItem(storageKey);
    } catch (err) {
      logger.error(getTypeSafeErr(err), `utils.storage.remove${capKeyName}`);
    }
  };

  return accum;
}, {} as StorageKeyMethods);

// prettier-ignore
type StorageKeyMethods = {
  [K in typeof STORAGE_KEY_NAMES[number] as `set${Capitalize<string & K>}`]: (input: unknown) => void;
} & {
  [K in typeof STORAGE_KEY_NAMES[number] as `get${Capitalize<string & K>}`]: () => string | null | undefined;
} & {
  [K in typeof STORAGE_KEY_NAMES[number] as `remove${Capitalize<string & K>}`]: () => void;
};

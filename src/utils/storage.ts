import { logger } from "./logger";
import { getTypeSafeErr } from "./typeSafety";
import type { Simplify } from "type-fest";

export const _STORAGE_KEYS = ["authToken", "checkoutValues", "preferredTheme"] as const;

export type LocalStorageWrapperKeysArray = typeof _STORAGE_KEYS;
export type LocalStorageWrapperKey = LocalStorageWrapperKeysArray[number];
export type LocalStorageUtil = Simplify<
  { KEYS: LocalStorageWrapperKeysArray } & {
    [K in LocalStorageWrapperKey as K]: LocalStorageValueManager;
  }
>;

export class LocalStorageValueManager {
  protected storageKey: LocalStorageWrapperKey;

  constructor(storageKey: LocalStorageWrapperKey) {
    this.storageKey = storageKey;
  }

  get(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  set(value: unknown): void {
    try {
      const valueToStore = typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(this.storageKey, valueToStore);
    } catch (err) {
      // prettier-ignore
      logger.error(getTypeSafeErr(err), `[LocalStorageWrapper] Failed to set value "${value}" for key ${this.storageKey}.`);
    }
  }

  setDefaultIfEmpty(defaultValue: unknown): void {
    const currentlyStoredValue = this.get();
    if (currentlyStoredValue === null) this.set(defaultValue);
  }

  remove(): void {
    localStorage.removeItem(this.storageKey);
  }
}

/**
 * A handy wrapper around the LocalStorage API.
 *
 * For each localStorage key used in this app, the key is made available on the
 * storage object along with localStorage wrapper methods.
 */
export const storage = _STORAGE_KEYS.reduce(
  (acc, storageKey) => ({
    ...acc,
    [storageKey]: new LocalStorageValueManager(storageKey),
  }),
  { KEYS: _STORAGE_KEYS } as LocalStorageUtil
);

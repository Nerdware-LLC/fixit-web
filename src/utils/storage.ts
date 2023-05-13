import { logger } from "./logger";
import { getTypeSafeErr } from "./typeSafety";
import type { Simplify } from "type-fest";

export type LocalStorageWrapperKey = "authToken" | "preferredTheme" | "checkoutValues";
export type LocalStorageWrapperKeysArray = ReadonlyArray<LocalStorageWrapperKey>;
interface LocalStorageValueManagerConfig {
  key: LocalStorageWrapperKey;
  usesJSON?: boolean;
}

export const _STORAGE_KEY_CONFIGS: ReadonlyArray<LocalStorageValueManagerConfig> = [
  { key: "authToken" },
  { key: "preferredTheme" },
  { key: "checkoutValues", usesJSON: true },
] as const;

export const _STORAGE_KEYS = _STORAGE_KEY_CONFIGS.map(
  ({ key }) => key
) as LocalStorageWrapperKeysArray;

export type LocalStorageUtil = Simplify<
  { KEYS: LocalStorageWrapperKeysArray } & {
    [K in LocalStorageWrapperKey as K]: LocalStorageValueManager;
  }
>;

export class LocalStorageValueManager {
  protected storageKey: LocalStorageWrapperKey;
  get: () => string | null;

  constructor({ key, usesJSON = false }: LocalStorageValueManagerConfig) {
    this.storageKey = key;
    this.get = usesJSON
      ? () => JSON.parse(localStorage.getItem(this.storageKey) ?? "null")
      : () => localStorage.getItem(this.storageKey);
  }

  set(value: unknown): void {
    try {
      const valueToStore = typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(this.storageKey, valueToStore);
    } catch (err) {
      // prettier-ignore
      logger.error(getTypeSafeErr(err), `[LocalStorageWrapper] Failed to set value "${value}" for key "${this.storageKey}".`);
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
export const storage = _STORAGE_KEY_CONFIGS.reduce(
  (acc, { key, usesJSON = false }) => ({
    ...acc,
    [key]: new LocalStorageValueManager({ key, usesJSON }),
  }),
  { KEYS: _STORAGE_KEYS } as LocalStorageUtil
);

import { logger } from "./logger";
import { getTypeSafeErr } from "./typeSafety";
import type { Simplify } from "type-fest";

const _STORAGE_KEY_CONFIGS: ReadonlyArray<{
  readonly key:
    | "authToken"
    | "checkoutValues"
    | "preferredTheme"
    | "workOrdersListViewSettings"
    | "invoicesListViewSettings"
    | "contactsListViewSettings";
  readonly usesJSON?: boolean;
}> = [
  { key: "authToken" },
  { key: "checkoutValues", usesJSON: true },
  { key: "preferredTheme" },
  { key: "workOrdersListViewSettings", usesJSON: true },
  { key: "invoicesListViewSettings", usesJSON: true },
  { key: "contactsListViewSettings", usesJSON: true },
] as const;

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
    KEYS: [...acc.KEYS, key],
  }),
  { KEYS: [] as LocalStorageWrapperKeysArray } as LocalStorageUtil
);

export type LocalStorageWrapperKey = (typeof _STORAGE_KEY_CONFIGS)[number]["key"];
export type LocalStorageWrapperKeysArray = Array<LocalStorageWrapperKey>;
interface LocalStorageValueManagerConfig {
  key: LocalStorageWrapperKey;
  usesJSON?: boolean;
}
export type LocalStorageUtil = Simplify<
  { KEYS: LocalStorageWrapperKeysArray } & {
    [K in LocalStorageWrapperKey as K]: LocalStorageValueManager;
  }
>;

import { safeJsonStringify } from "@nerdware/ts-type-safety-utils";
import type { Jsonifiable } from "type-fest";

/**
 * Each instance of this class manages a single value in the browser's `localStorage`
 * under the provided `storageKey` using straight-forward get/set/remove methods.
 *
 * > All values are stored and parsed as JSON.
 *
 * @template StoredType - The type of the value to be stored. Must be a valid JSON value type.
 * @category Utility
 * @example
 * ```ts
 * // Create an instance of LocalStorageValueManager with a storage key and an initial value
 * const manager = new LocalStorageValueManager("myKey", "initialValue");
 * manager.get(); //    Returns "initialValue"
 * manager.set("newValue");
 * manager.setDefaultIfEmpty("default"); // <-- will do nothing
 * manager.get(); //    Returns "newValue"
 * manager.remove(); // Removes the stored value
 * manager.setDefaultIfEmpty("default");
 * manager.get(); //    Returns "default"
 * ```
 */
export class LocalStorageValueManager<StoredValueType extends Jsonifiable> {
  protected readonly storageKey: string;
  /** A default TTL to apply to all data stored by an LSVM instance. */
  protected readonly ttl: StoredValueTTL;

  constructor(key: string, { initialValue, ttl }: LsvmOptions<StoredValueType> = {}) {
    this.storageKey = key;
    this.ttl = ttl;
    if (initialValue !== undefined) this.setDefaultIfEmpty(initialValue);
  }

  /**
   * Retrieves the stored value from `localStorage` and parses it from JSON.
   * @returns The stored value, parsed from JSON, or `null` if the stored value is empty.
   */
  readonly get = (): StoredValueType | null => {
    const rawValue = localStorage.getItem(this.storageKey);

    if (rawValue === null) return null;

    let lsvmDataWrapper;

    try {
      lsvmDataWrapper = JSON.parse(rawValue) as unknown as LsvmDataWrapper<StoredValueType> | null;
      if (!lsvmDataWrapper) return null;
    } catch {
      return null;
    }

    if (!!lsvmDataWrapper.expiresAt && lsvmDataWrapper.expiresAt < Date.now()) {
      this.remove();
      return null;
    }

    return lsvmDataWrapper.data ?? null;
  };

  /**
   * Stores a new value as stringified JSON in `localStorage`.
   * @param value - The value to be stored.
   */
  readonly set = (value: StoredValueType, ttl: StoredValueTTL = this.ttl): void => {
    const valueDataWrapper: LsvmDataWrapper<StoredValueType> = {
      data: value,
      ...(ttl && { expiresAt: Date.now() + ttl }),
    };

    localStorage.setItem(this.storageKey, safeJsonStringify(valueDataWrapper));
  };

  /**
   * Stores a default value in `localStorage` if the stored value is empty.
   * @param defaultValue - The value to be stored if the stored value is empty.
   */
  readonly setDefaultIfEmpty = (defaultValue: StoredValueType): void => {
    const currentlyStoredValue = this.get();
    if (currentlyStoredValue === null) this.set(defaultValue);
  };

  /**
   * Removes the stored value from `localStorage`.
   */
  readonly remove = (): void => {
    localStorage.removeItem(this.storageKey);
  };
}

/**
 * Options that can be provided to the LSVM constructor.
 */
type LsvmOptions<StoredValueType extends Jsonifiable> = {
  initialValue?: StoredValueType | undefined;
  ttl?: StoredValueTTL;
};

/**
 * The time-to-live (TTL) value to apply to stored value.
 */
type StoredValueTTL = number | undefined;

/**
 * The JSON wrapper object LSVM uses to manage data in LocalStorage.
 */
interface LsvmDataWrapper<StoredValueType extends Jsonifiable> {
  /** The value stored in LocalStorage. */
  data: StoredValueType;
  /** Timestamp reflecting when the data expires. */
  expiresAt?: StoredValueTTL;
}

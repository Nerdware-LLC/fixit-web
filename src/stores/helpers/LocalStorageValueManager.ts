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
export class LocalStorageValueManager<StoredType extends Jsonifiable> {
  protected readonly storageKey: string;

  constructor(key: string, initialValue?: StoredType) {
    this.storageKey = key;
    if (initialValue !== undefined) this.setDefaultIfEmpty(initialValue);
  }

  /**
   * Retrieves the stored value from `localStorage` and parses it from JSON.
   * @returns The stored value, parsed from JSON, or `null` if the stored value is empty.
   */
  get() {
    const storedValue = localStorage.getItem(this.storageKey);
    let returnValue;
    try {
      returnValue = JSON.parse(storedValue);
    } catch {
      returnValue = storedValue;
    }
    return returnValue as StoredType;
  }

  /**
   * Stores a new value as stringified JSON in `localStorage`.
   * @param value - The value to be stored.
   */
  set(value: StoredType): void {
    const jsonValue = safeJsonStringify(value);
    localStorage.setItem(this.storageKey, jsonValue);
  }

  /**
   * Stores a default value in `localStorage` if the stored value is empty.
   * @param defaultValue - The value to be stored if the stored value is empty.
   */
  setDefaultIfEmpty(defaultValue: StoredType): void {
    const currentlyStoredValue = this.get();
    if (currentlyStoredValue === null) this.set(defaultValue);
  }

  /**
   * Removes the stored value from `localStorage`.
   */
  remove(): void {
    localStorage.removeItem(this.storageKey);
  }
}

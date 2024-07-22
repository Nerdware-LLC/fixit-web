import { makeVar, type ReactiveVar } from "@apollo/client/cache";
import { useReactiveVar } from "@apollo/client/react/hooks";
import { isPlainObject } from "@nerdware/ts-type-safety-utils";
import deepMerge from "lodash.merge";
import { LocalStorageValueManager } from "./LocalStorageValueManager.js";
import type { Jsonifiable, JsonArray } from "type-fest";

/**
 * A handy wrapper around apollo's reactive-var functionality. The constructor args
 * must include either a `defaultValue` or a {@link LocalStorageValueManager} instance.
 * If `defaultValue` is not provided, the value will be initialized with the value
 * stored in `localStorage`.
 *
 * @param defaultValue - The value the reactive-var will be set to upon initialization.
 * @param storageValueManager - Provide a {@link LocalStorageValueManager} to add persistence functionality.
 * @template ValueType - The type of the reactive-var's value.
 */
export class ReactiveStore<ValueType extends ValidReactiveStoreValue> {
  protected readonly reactiveVar: ReactiveVar<ValueType>;
  protected readonly defaultValue: ValueType;
  protected readonly storageValueManager:
    | InstanceType<typeof LocalStorageValueManager<ValueType>>
    | undefined;

  constructor({
    defaultValue,
    storageValueManager,
  }: {
    defaultValue?: ValueType;
    storageValueManager?: InstanceType<typeof LocalStorageValueManager<ValueType>> | undefined;
  }) {
    if (defaultValue === undefined) {
      if (storageValueManager === undefined) {
        throw new Error(
          `ReactiveStore must be initialized with either a "defaultValue" or "storageValueManager".`
        );
      }

      this.storageValueManager = storageValueManager;

      // Initialize with the value stored in localStorage
      defaultValue = this.storageValueManager.get() as ValueType;
    }

    this.defaultValue = defaultValue;
    this.reactiveVar = makeVar(defaultValue);
  }

  /**
   * Returns the current value of the reactive-var.
   */
  get = () => this.reactiveVar();

  /**
   * Calls `useReactiveVar` to subscribe to reactive-var changes.
   */
  useSubToStore = () => useReactiveVar(this.reactiveVar);

  /**
   * Set a new value for the reactive-var. If a `storageValueManager` was
   * provided, the value is also updated in `localStorage`.
   */
  set = (newValue?: ValueType) => {
    if (this.storageValueManager && newValue !== undefined) {
      this.storageValueManager.set(newValue);
    }

    return this.reactiveVar(newValue);
  };

  /**
   * This method uses `lodash.merge` to deep-merge the provided `partialNewValue`
   * arg with the current value of the reactive-var. If a `storageValueManager`
   * was provided, the value is also updated in `localStorage`.
   *
   * > Note: This method should only be used with reactive-vars for which the
   *   value is an iterable object, and should only be called with the same.
   */
  mergeUpdate = (
    partialNewValue: ValueType extends Record<PropertyKey, unknown>
      ? { [Key in keyof ValueType]?: Exclude<ValueType[Key], undefined> }
      : never
  ) => {
    const currentValue = this.get();

    // If `currentValue` is not set, use `partialNewValue` as the new value
    if (currentValue === null) return this.set(partialNewValue as unknown as ValueType);

    // Ensure the reactive-var's value is an iterable object
    if (!isPlainObject(currentValue)) {
      throw new Error(
        `ReactiveStore.mergeUpdate() can only be used with reactive-vars whose values are iterable objects.`
      );
    }

    /* lodash.merge mutates the first arg in place, and the returned object has
    the same object reference as the first arg. Without a new ref, the reactiveVar
    fails to update its subscribers, so to address this, `currentValue` is spread
    to ensure `newMergedValue` always gets a new ref to update store subscribers.*/
    const newMergedValue = deepMerge(
      { ...(currentValue as Record<PropertyKey, unknown>) } as ValueType,
      partialNewValue
    );

    return this.set(newMergedValue as ValueType);
  };

  /**
   * Resets the reactive-var to the store's `defaultValue`.
   */
  reset = () => this.set(this.defaultValue);

  /**
   * Clears the reactive-var. If a `storageValueManager` was provided, the K/V
   * is also removed from `localStorage`.
   */
  clear = () => {
    if (this.storageValueManager) this.storageValueManager.remove();
    return this.reset();
  };
}

/**
 * Valid ReactiveStore `ValueType` type parameter. Any {@link Jsonifiable}
 * value is valid, except for {@link JsonArray}, which is excluded since
 * it would cause the `mergeUpdate` method to be unnecessarily over-complicated,
 * and in practice this app doesn't use any reactive-vars with array values
 * (_nested array values are fine - just not a top-level array_).
 */
export type ValidReactiveStoreValue = Exclude<Jsonifiable, JsonArray>;

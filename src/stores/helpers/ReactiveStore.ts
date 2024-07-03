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
 *
 * @template ValueType - The type of the reactive-var's value.
 * @template ValidatedValueType - The type of the reactive-var's value after validation. If this
 *   type parameter is provided, then the resulting instance's methods like `useSubToStore()` can
 *   be provided with a boolean type parameter to indicate that the reactive-var's value has been
 *   previously validated, causing the return type of the method to be narrowed to the validated
 *   type. This is useful when `ValueType` is a plain key-value store object with optional/nullable
 *   fields, and the `ValidatedValueType` is the same object with all fields required.
 */
export class ReactiveStore<
  ValueType extends ValidReactiveStoreValue,
  ValidatedValueType extends ValidReactiveStoreValue = ValueType,
> {
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
  get<ShouldReturnValidatedValueType extends boolean = false>() {
    return this.reactiveVar() as ShouldReturnValidatedValueType extends true
      ? ValidatedValueType
      : ValueType;
  }

  /**
   * Calls `useReactiveVar` to subscribe to reactive-var changes.
   */
  useSubToStore<ShouldReturnValidatedValueType extends boolean = false>() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useReactiveVar(this.reactiveVar) as ShouldReturnValidatedValueType extends true
      ? ValidatedValueType
      : ValueType;
  }

  /**
   * Set a new value for the reactive-var. If a `storageValueManager` was
   * provided, the value is also updated in `localStorage`.
   */
  set<ShouldReturnValidatedValueType extends boolean = false>(newValue?: ValueType) {
    if (this.storageValueManager && newValue !== undefined) {
      this.storageValueManager.set(newValue);
    }
    return this.reactiveVar(newValue) as ShouldReturnValidatedValueType extends true
      ? ValidatedValueType
      : ValueType;
  }

  /**
   * This method uses `lodash.merge` to deep-merge the provided `partialNewValue`
   * arg with the current value of the reactive-var. If a `storageValueManager`
   * was provided, the value is also updated in `localStorage`.
   *
   * > Note: This method should only be used with reactive-vars for which the
   *   value is an iterable object, and should only be called with the same.
   */
  mergeUpdate<ShouldReturnValidatedValueType extends boolean = false>(
    partialNewValue: ValueType extends Record<PropertyKey, unknown>
      ? { [Key in keyof ValueType]?: Exclude<ValueType[Key], undefined> }
      : never
  ) {
    const currentValue = this.get();

    // If `currentValue` is not set, use `partialNewValue` as the new value
    if (currentValue === null)
      return this.set<ShouldReturnValidatedValueType>(partialNewValue as unknown as ValueType);

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

    return this.set<ShouldReturnValidatedValueType>(newMergedValue as ValueType);
  }

  /**
   * Resets the reactive-var to the store's `defaultValue`.
   */
  reset<ShouldReturnValidatedValueType extends boolean = false>() {
    return this.set<ShouldReturnValidatedValueType>(this.defaultValue);
  }

  /**
   * Clears the reactive-var. If a `storageValueManager` was provided, the K/V
   * is also removed from `localStorage`.
   */
  clear<ShouldReturnValidatedValueType extends boolean = false>() {
    if (this.storageValueManager) this.storageValueManager.remove();
    return this.reset<ShouldReturnValidatedValueType>();
  }
}

/**
 * Valid ReactiveStore `ValueType` type parameter. Any {@link Jsonifiable}
 * value is valid, except for {@link JsonArray}, which is excluded since
 * it would cause the `mergeUpdate` method to be unnecessarily over-complicated,
 * and in practice this app doesn't use any reactive-vars with array values
 * (_nested array values are fine - just not a top-level array_).
 */
export type ValidReactiveStoreValue = Exclude<Jsonifiable, JsonArray>;

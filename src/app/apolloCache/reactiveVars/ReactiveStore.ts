import { makeVar, type ReactiveVar } from "@apollo/client/cache";
import { useReactiveVar } from "@apollo/client/react/hooks";
import deepMerge from "lodash.merge";
import { storage, type LocalStorageWrapperKey } from "@utils/storage";
import type { PartialDeep } from "type-fest";

/**
 * A handy wrapper around apollo's reactive-var functionality.
 *
 * @param storageKey - Provide a localStorage key to add persistence functionality.
 * @param defaultValue - The value the reactive-var will be set to upon initialization.
 * @param valueOnInit - The value stored in the reactive-var upon initialization.
 * @param valueOnReset - The value the reactive-var will be set to when `reset` is called.
 */
export class ReactiveStore<T extends ReactiveStoreValueType> {
  protected reactiveVar: ReactiveVar<T>;
  protected storageKey: LocalStorageWrapperKey | undefined;
  protected valueOnReset: T;

  constructor({
    defaultValue,
    storageKey,
    valueOnInit,
    valueOnReset,
  }: {
    defaultValue?: T;
    storageKey?: LocalStorageWrapperKey;
    valueOnInit?: T;
    valueOnReset?: T;
  } = {}) {
    valueOnInit ??= storageKey ? (storage[storageKey].get() as T) : (defaultValue as T);
    valueOnReset ??= valueOnInit;

    // If both storageKey and defaultValue were provided, ensure the value is init'd in localStorage
    if (storageKey && defaultValue) storage[storageKey].setDefaultIfEmpty(defaultValue);

    this.reactiveVar = makeVar(valueOnInit);
    this.storageKey = storageKey;
    this.valueOnReset = valueOnReset;
  }

  /**
   * Returns the current value of the reactive-var.
   */
  get() {
    return this.reactiveVar();
  }

  /**
   * Calls `useReactiveVar` to subscribe to reactive-var changes.
   */
  useSubToStore() {
    return useReactiveVar(this.reactiveVar); // eslint-disable-line react-hooks/rules-of-hooks
  }

  /**
   * Set a new value for the reactive-var. If a `storageKey` was provided, the
   * value is also updated in localStorage.
   */
  set(newValue?: T) {
    if (this.storageKey) storage[this.storageKey].set(newValue);
    return this.reactiveVar(newValue);
  }

  /**
   * Deep-merges the provided value with the current value of the reactive-var.
   * If a `storageKey` was provided, the value is also updated in localStorage.
   */
  mergeUpdate(partialNewValue?: PartialDeep<T>) {
    const newValue = deepMerge(this.reactiveVar(), partialNewValue);
    return this.set(newValue);
  }

  /**
   * Resets the reactive-var to the value provided in the constructor's `valueOnReset` param.
   * > `valueOnReset` defaults to `valueOnInit` if not provided.
   */
  reset() {
    return this.set(this.valueOnReset);
  }

  /**
   * Clears the reactive-var. If a `storageKey` was provided, the K/V is also rm'd from localStorage.
   */
  clear() {
    if (this.storageKey) storage[this.storageKey].remove();
    return this.reset();
  }
}

export type ReactiveStoreValueType =
  | string
  | number
  | boolean
  | Record<string, any>
  | Array<ReactiveStoreValueType>
  | null;

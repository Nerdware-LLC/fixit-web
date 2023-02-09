import { makeVar, type ReactiveVar } from "@apollo/client/cache";
import { useReactiveVar } from "@apollo/client/react/hooks";
import { storage } from "@utils";

/**
 * A handy wrapper around apollo's reactive-var functionality.
 *
 * - `storageKey` Provide a localStorage key to add persistence functionality.
 * - `valueOnInit` The value stored in the reactive-var upon initialization, or a
 *   function which when called returns an initial store value.
 * - `valueOnReset` The value the reactive-var will be set to when the `reset()`
 *   method is called. If not provided, this defaults to `valueOnInit`.
 */
export class ReactiveStore<T extends string | number | boolean | Record<string, any> | Array<any>> {
  private reactiveVar: ReactiveVar<T>;

  get: () => T;
  set: (newValue?: T) => T;
  useSubToStore: () => T;
  reset: () => void;
  clear: () => void;

  constructor({
    storageKey,
    defaultValue,
    valueOnInit = storageKey
      ? (storage[storageKey].get() as T | null) ?? defaultValue
      : defaultValue,
    valueOnReset = valueOnInit
  }: {
    storageKey?: typeof storage.KEYS[number];
    defaultValue?: T;
    valueOnInit?: T;
    valueOnReset?: T;
  } = {}) {
    this.reactiveVar = makeVar(valueOnInit) as ReactiveVar<T>;

    // Read-methods are the same regardless of persistence functionality:
    this.get = () => this.reactiveVar();
    this.useSubToStore = () => useReactiveVar(this.reactiveVar); // eslint-disable-line react-hooks/rules-of-hooks

    // If persistence is desired, a localStorage write-op is added to set:
    this.set = !storageKey
      ? (newValue?: T) => this.reactiveVar(newValue)
      : (newValue?: T) => {
          storage[storageKey].set(newValue);
          return this.reactiveVar(newValue);
        };

    // reset uses this.set to write valueOnReset:
    this.reset = () => {
      this.set(valueOnReset);
    };

    // clear = reset, and for persisted values the K/V is also rm'd from localStorage
    this.clear = !storageKey
      ? this.reset
      : () => {
          this.reset();
          storage[storageKey].remove();
        };
  }
}

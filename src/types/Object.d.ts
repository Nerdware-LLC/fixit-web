export {};

declare global {
  /**
   * This instructs the TS compiler to accept `hasOwnProperty` as an
   * alternative to `key in obj` type-narrowing syntax.
   */
  interface Object {
    hasOwnProperty<K extends PropertyKey>(key: K): this is Record<K, unknown>;
  }
}

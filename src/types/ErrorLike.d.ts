export {};

declare global {
  /**
   * `ErrorLike` is a utility type for errors which simply aliases `unknown`.
   * - Use the `getTypeSafeErr()` function to narrow down ErrorLike values
   * (located in `src/utils/typeSafety/getTypeSafeErr`).
   */
  type ErrorLike = unknown;
}

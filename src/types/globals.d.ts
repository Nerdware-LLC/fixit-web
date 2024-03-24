import type { JsonValue } from "type-fest";
import type { GoogleOAuthClient } from "./googleOAuth";

declare global {
  /**
   * This declaration makes the following modifications to the `JSON.parse` typedef:
   *
   * - For the `string` argument overload, the `any` return type is replaced with
   *   {@link JsonValue | type-fest's `JsonValue`} .
   * - Add `number` overload, since `JSON.parse(42)` is valid and returns `42`.
   * - Add `null` overload, since `JSON.parse(null)` is valid and returns `null`.
   */
  interface JSON {
    parse(
      text: string | null,
      reviver?: (this: any, key: string, value: unknown) => unknown
    ): JsonValue;
    parse(text: number, reviver?: (this: any, key: string, value: unknown) => unknown): number;
    parse(text: null, reviver?: (this: any, key: string, value: unknown) => unknown): null;
  }

  interface Window {
    /**
     * Google OAuth Client
     * > The Google OAuth client library is loaded asynchronously via a script tag.
     */
    google?: GoogleOAuthClient;
  }
}

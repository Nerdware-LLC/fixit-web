import type { JsonValue } from "type-fest";
import type { GoogleOAuthClient } from "./googleOAuth.js";

declare global {
  /**
   * This declaration adds `JSON.parse` overload that replaces `any` with {@link JsonValue}.
   */
  interface JSON {
    parse(
      text: JsonValue,
      reviver?: (this: typeof JSON, key: string, value: unknown) => unknown
    ): JsonValue;
  }

  interface Window {
    /**
     * The Google OAuth Client library is loaded asynchronously via a script tag.
     */
    google?: GoogleOAuthClient;
  }
}

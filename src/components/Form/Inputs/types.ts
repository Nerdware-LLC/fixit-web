/** Name-related `autocomplete` attribute values. */
export type NameAutoCompleteValue =
  | "name"
  | "name given-name"
  | "name additional-name" // middle name
  | "name family-name"
  | "name nickname";

/** Telephone-related `autocomplete` attribute values. */
export type TelAutoCompleteValue =
  | "tel"
  | "tel-country-code"
  | "tel-national"
  | "tel-area-code"
  | "tel-local"
  | "tel-local-prefix"
  | "tel-local-suffix"
  | "tel-extension";

/** Country-related `autocomplete` attribute values. */
export type CountryAutoCompleteValue = "country" | "country-name";

/** Password-related `autocomplete` attribute values. */
export type PasswordAutoCompleteValue = "current-password" | "new-password";

/**
 * Union typing of supported `autocomplete` attribute values.
 * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
 *
 * Note: this type does not reflect an exhaustive list of all possible `autocomplete`
 * values; certain values have been excluded for i18n purposes if they reflect only a
 * region-specific consitutent part of a data point for which a more generalized form
 * is both available and preferred (for example, "name" is preferred over "given-name",
 * "family-name", "honorific-prefix", "honorific-suffix", etc.).
 */
export type AutoCompleteAttributeValue =
  | "on"
  | "off"
  | NameAutoCompleteValue
  // COMMUNICATION
  | "email"
  | TelAutoCompleteValue
  // ADDRESS
  | "street-address"
  | "postal-code" // In the US this is a ZIP code
  | CountryAutoCompleteValue
  // AUTHENTICATION
  | "username" // username or email
  | "one-time-code"
  | PasswordAutoCompleteValue
  // ORGANIZATION
  | "organization"
  | "organization-title"
  // PAYMENT
  | "cc-name"
  | "cc-number"
  | "cc-exp" //  MM/YY or MM/YYYY
  | "cc-csc" //  payment security code
  | "cc-type" // payment card typed (e.g. "Visa")
  | "transaction-currency"
  | "transaction-amount";

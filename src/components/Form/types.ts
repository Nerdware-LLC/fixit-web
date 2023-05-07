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
  // PERSONAL
  | "name"
  | "email"
  | "tel"
  // BUSINESS
  | "organization"
  | "organization-title"
  // ADDRESS
  | "street-address"
  | "postal-code" //  in the US this is a ZIP code
  | "country" //      country or territyory CODE
  | "country-name" // country or territyory NAME
  // AUTHENTICATION
  | "username"
  | "current-password"
  | "new-password"
  | "one-time-code"
  // PAYMENT
  | "cc-name"
  | "cc-number"
  | "cc-exp" //  MM/YY or MM/YYYY
  | "cc-csc" //  payment security code
  | "cc-type" // payment card typed (e.g. "Visa")
  | "transaction-currency"
  | "transaction-amount";

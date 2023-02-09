/**
 * A union of supported region names for which a phone number format is
 * supported.
 *
 * > Currently only `"USA"` is supported.
 */
export type PhoneFormatRegions = "USA";

/**
 * A map of supported region names to phone-format config objects which
 * contain `maskFormat` and `placeholder` strings.
 *
 * > Currently only `"USA"` is supported.
 */
export const REGIONAL_PHONE_FORMATS: Record<
  PhoneFormatRegions,
  { maskFormat: string; placeholder: string }
> = {
  USA: {
    maskFormat: "(000) 000-0000",
    placeholder: "(123) 456-7890"
  }
};

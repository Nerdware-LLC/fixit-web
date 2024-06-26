import { isValidEmail, isValidPassword } from "@nerdware/ts-string-helpers";
import { string as yupString } from "yup";

/**
 * Base string schema: `yup.string().defined().trim().max(250).default("")`
 * - Prohibits `undefined` values.
 * - Trim whitespace from front and end of string values.
 * - Default max 250 per field ensures strings fit within API/DB limitations.
 * - Setting a default value of `''` ensures that calls to `Schema.getDefault()` and/or
 *   `Schema.cast()` do not result in fields with `undefined` values.
 */
const yupBaseStringSchema = yupString().defined().trim().max(250).default("");

const yupNullableStringSchema = yupBaseStringSchema.nullable().default(null);

/**
 * @note Yup order of operations:
 *   1. transforms
 *   2. defaults
 *   3. validations
 */
export const yupCommonSchema = {
  /** ### Base string schema: `yup.string().defined().trim().max(250).default("")` */
  string: yupBaseStringSchema,

  /** ### Nullable string schema: `yup.string().defined().trim().max(250).nullable().default(null)` */
  stringNullable: yupNullableStringSchema,

  /** ### Email string schema */
  email: yupBaseStringSchema
    /**
     * Yup's `email` validation uses the following pattern:
     *   `/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/`
     * They sourced the pattern from here:
     * https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
     */
    .email("Invalid email")
    .test({
      name: "is-valid-email",
      message: "Please enter a valid email",
      test: (value) => isValidEmail(value),
    }),

  /** ### Phone string schema (for US phone numbers only) */
  phone: yupBaseStringSchema.matches(
    /^\([1-9]\d{2}\)\s?\d{3}\s?-\s?\d{4}$/,
    "Must be a valid US phone number"
  ),

  /**
   * ### Schema: Google OAuth2 ID Token (base64-encoded string)
   * > **Note:** This cannot depend on the value of `password`, as that creates a circular dependency.
   */
  googleIDToken: yupNullableStringSchema.max(Number.MAX_SAFE_INTEGER),

  /**
   * ### Schema: Password
   *
   * A nullable-string schema which depends on the value of `googleIDToken`:
   * - WHEN `googleIDToken` is present/truthy, `password` is nullable.
   * - WHEN `googleIDToken` is not present/falsy, `password` must meet the following conditions:
   *   - Contains at least one lowercase letter.
   *   - Contains at least one uppercase letter.
   *   - Contains at least one number.
   *   - Contains at least one of !, \@, #, $, %, ^, &, and/or *.
   *   - Is at least 6 characters long, and no more than 250 characters long.
   */
  // prettier-ignore
  password: yupString().defined().nullable().default(null).when("googleIDToken", {
    is: (googleIDToken: string | null) => !!googleIDToken,
    then: (schema) => schema,
    otherwise: (schema) => schema.nonNullable().default("").trim().max(250)
      .test({
        name: "is-right-length",
        message: "Passwords must be between 6-250 characters",
        test: (value) => value?.length >= 6 && value?.length <= 250,
      })
      .test({
        name: "contains-lowercase-char",
        message: "Passwords must contain at least 1 lowercase letter",
        test: (value) => /[a-z]/.test(value),
      })
      .test({
        name: "contains-uppercase-char",
        message: "Passwords must contain at least 1 uppercase letter",
        test: (value) => /[A-Z]/.test(value),
      })
      .test({
        name: "contains-number",
        message: "Passwords must contain at least one number",
        test: (value) => /\d/.test(value),
      })
      .test({
        name: "contains-special-char",
        message: "Must contain at least one special character: !, @, #, $, %, ^, &, or *",
        test: (value) => /[!@#$%^&*]/.test(value),
      })
      // This last one should be unnecessary, but it's here just in case.
      .test({
        name: "fallback-is-valid-password",
        message: "Your password does not meet platform requirements",
        test: (value) => isValidPassword(value),
      }),
    }),
} as const;

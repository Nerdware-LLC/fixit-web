import { isValidEmail, isValidPassword } from "@nerdware/ts-string-helpers";
import { string as yupString } from "yup";

/**
 * Base string schema: `yup.string().trim().max(250)`
 * - Trim whitespace from front and end of string values.
 * - Default max 250 per field ensures strings fit within API/DB limitations.
 * - Setting a default value of `''` ensures that calls to `Schema.getDefault()` and/or
 *   `Schema.cast()` do not result in fields with `undefined` values.
 */
const yupBaseStringSchema = yupString().trim().max(250).default("");

/**
 * @note Yup order of operations:
 *   1. transforms
 *   2. defaults
 *   3. validations
 */
export const yupCommonSchema = {
  /** Base string schema: `yup.string().trim().max(250).default('')` */
  string: yupBaseStringSchema,
  /** Nullable string schema: `yup.string().trim().max(250).nullable().default(null)` */
  stringNullable: yupBaseStringSchema.nullable().default(null),
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
  phone: yupBaseStringSchema.matches(
    /^\([1-9]\d{2}\)\s?\d{3}\s?-\s?\d{4}$/,
    "Must be a valid US phone number"
  ),
  password: yupBaseStringSchema.test({
    name: "is-valid-password",
    message: "Please enter a valid password",
    test: (value) => isValidPassword(value),
  }),
} as const;

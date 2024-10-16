import { object as yupObject, type InferType } from "yup";
import { yupCommonSchema, getInitialValuesFromSchema } from "@/components/Form/helpers";

/**
 * Yup Schema for above `Form`s "validationSchema" prop.
 */
export const registerFormSchema = yupObject({
  handle: yupCommonSchema.string
    .lowercase()
    .required(`Please choose a user handle (e.g., @my_username)`)
    .test({
      name: "no-banned-chars",
      test: (value, { createError }) => {
        // Ensure value only contains letters, numbers, and underscores.
        // If invalid chars are present, set an err msg with the first invalid char:
        const badChars = /[^a-z0-9_]/gi.exec(value);
        return badChars ? createError({ message: `Invalid character: ${badChars[0]}` }) : true;
      },
    })
    .test({
      name: "is-right-length",
      message: "User handles must be between 3-50 characters",
      test: (value) => value.length >= 3 && value.length <= 50,
    }),
  phone: yupCommonSchema.phone.nullable().default(null),
  email: yupCommonSchema.email.required("Please provide an email"),
  password: yupCommonSchema.password,
  googleIDToken: yupCommonSchema.googleIDToken,
});

/**
 * Object for above `Form`s "initialValues" prop.
 */
export const registerFormInitialValues = getInitialValuesFromSchema(registerFormSchema);

export type RegisterFormValues = InferType<typeof registerFormSchema>;

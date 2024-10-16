import type { ObjectSchema, AnyObject } from "yup";

/**
 * This function returns an `initialValues` prop for Formik forms based on the provided
 * Yup object schema and optional `mergeInitialValues` argument.
 *
 * @param yupObjectSchema - A Yup object schema.
 * @param mergeInitialValues - An optional object to provide to the schema's `cast()` method.
 *   Use this param to obtain `initialValues` for a form which is being used to update an
 *   existing item. If not provided, this defaults to the return value of `getDefault()`.
 * @param shouldAssertCastReturnType - An optional boolean indicating whether or not to
 *   assert that the return value of `cast()` is assignable to the schema's type param.
 * @returns An `initialValues` object with the same shape as the provided Yup object schema.
 */
export const getInitialValuesFromSchema = <
  TInitialValues extends AnyObject,
  TContext extends AnyObject = AnyObject,
  Schema extends ObjectSchema<TInitialValues, TContext> = ObjectSchema<TInitialValues, TContext>,
>(
  yupObjectSchema: Schema,
  mergeInitialValues?: Record<string, unknown>,
  shouldAssertCastReturnType: boolean = true
) => {
  // If mergeInitialValues was not provided, use the schema's default values.
  mergeInitialValues ||= yupObjectSchema.getDefault() as Record<string, unknown>;

  return yupObjectSchema.cast(mergeInitialValues, {
    stripUnknown: true,
    assert: shouldAssertCastReturnType,
  });
};

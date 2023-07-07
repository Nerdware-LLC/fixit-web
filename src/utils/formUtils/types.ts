export type OnSubmitFieldMutationProcessorFn<FormFieldValueType = any> = (
  formSubmitHandlerFieldValue: FormFieldValueType | null,
  initialFieldValue: FormFieldValueType | null,
  ...args: any[]
) => OnSubmitFieldMutationProcessorFnReturn;

export interface OnSubmitFieldMutationProcessorFnReturn<FormFieldValueType = any> {
  wasChanged: boolean;
  mutationType?: "UPDATE" | "DELETE";
  value?: FormFieldValueType | null;
}

/**
 * This generic type performs the following mutations on T:
 *
 * 1. Omit keys in the ExcludedFields union type param.
 *
 * 2. Convert all optional fields to nullable.
 *    - `T | undefined` becomes `T | null`
 *
 * 3. Relational fields which point to an object in the source-type which contain
 *    property `id: string` are replaced with `string`.
 *    - `createdBy: User` becomes `createdBy: string`
 *
 * 4. Array elements are made non-nullable.
 *    - `Array<{ id: string } | null>` becomes `Array<{ id: string }>`
 *
 * 5. Date-union types have `string` and `number` excluded.
 *    - `Date | number | string | undefined` becomes `Date | null`
 *
 * 6. Since inputs with `type: "numeric"` still output string values, `number` is
 *    converted to `string`.
 */
export type FormValues<T extends Record<string, any>, ExcludedFields extends keyof T = ""> = {
  [K in Exclude<keyof T, ExcludedFields>]-?: Date extends T[K]
    ? DistributiveFormPropertyConversions<Exclude<T[K], string | number>>
    : DistributiveFormPropertyConversions<T[K]>;
};

/**
 * A distributive conditional generic used in `FormValues` for each property in
 * an object. Will apply `FormValues` recursively on non-relational objects.
 *
 * https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
 */
type DistributiveFormPropertyConversions<T> = T extends undefined
  ? null
  : T extends Array<infer El extends { id: string } | null>
  ? Array<Exclude<El, null>>
  : T extends { id: string }
  ? string
  : T extends Date
  ? Date
  : T extends Record<string, any>
  ? FormValues<T>
  : T extends number
  ? string
  : T;

export type NarrowDateValueTypes<T extends Record<string, any>> = {
  [K in keyof T]: Date extends T[K] ? Exclude<T[K], string | number> : T[K];
};

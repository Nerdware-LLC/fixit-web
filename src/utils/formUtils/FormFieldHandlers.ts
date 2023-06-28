import { wasArrayChanged } from "./wasArrayChanged";
import { wasDateTimeChanged } from "./wasDateTimeChanged";
import type { OnSubmitFieldMutationProcessorFn } from "./types";

/**
 * This class provides customizable handler functions which modify form values
 * going into into and coming out of Formik-based form components. Instances
 * are provided with two key methods:
 *
 * 1. `getInitValuesForUpdate` - This is used to transform "raw" form field
 *    values into the shape needed for the `initialValues` prop of Formik-based
 *    form components.
 *
 * 2. `getFormFieldsForMutation` - This is used to transform values from the
 *    Formik `onSubmit` handler into the type/shape needed for the relevant
 *    create or update operation. By default, if a field is unchanged from
 *    its initial value, it is excluded from the returned object.
 */
export class FormFieldHandlers<
  FormValues extends Record<string, any>,
  ValuesForMutation extends Record<string, any> = FormValues
> {
  private customFieldHandlers: {
    onUpdate: OnUpdateCallableFieldHandlers;
    onSubmit: OnSubmitFieldMutationProcessors;
  };

  private immutableItemFieldNames: Array<string> = [
    // These properties are always immutable:
    "__typename",
    "id",
    "createdAt",
  ];

  // METHODS USED BY onSubmit:
  public static wasArrayChanged = wasArrayChanged;
  public static wasDateTimeChanged = wasDateTimeChanged;
  private static defaultOnSubmitFieldMutationProcessor: OnSubmitFieldMutationProcessorFn = (
    formValue: any,
    initialFormValue: any
  ) => ({ wasChanged: formValue !== initialFormValue, value: formValue });

  constructor({ onUpdate = {}, onSubmit = {} }: FormFieldHandlersSchema = {}) {
    this.customFieldHandlers = {
      onUpdate: {},
      onSubmit,
    };

    Object.entries(onUpdate).forEach(([key, onUpdateFieldHandler]) => {
      // onUpdateFieldHandler is either a fn, or `false` to indicate immutability.
      if (onUpdateFieldHandler === false) {
        this.immutableItemFieldNames.push(key);
      } else {
        this.customFieldHandlers.onUpdate[key] = onUpdateFieldHandler;
      }
    });
  }

  /**
   * Obtains `initialValues` prop needed for UPDATE forms.
   */
  getInitValuesForUpdate = (itemToBeUpdated: Record<string, any>): FormValues => {
    return Object.entries(itemToBeUpdated).reduce(
      (updateFormFieldsAccum, [fieldKey, rawFieldValue]: [string & keyof FormValues, any]) => {
        // Skip immutable fields
        if (!this.immutableItemFieldNames.includes(fieldKey)) {
          // If a custom onUpdate field handler exists, use it, else use rawFieldValue
          updateFormFieldsAccum[fieldKey] =
            fieldKey in this.customFieldHandlers.onUpdate
              ? this.customFieldHandlers.onUpdate[fieldKey](rawFieldValue)
              : rawFieldValue;
        }
        return updateFormFieldsAccum;
      },
      {} as FormValues
    );
  };

  /**
   * Formats and filters data between form submission and mutation execution.
   * - Include this method in `handleSubmit` Form fns.
   */
  getFormFieldsForMutation = (
    submittedFormValues: FormValues,
    existingItemInitialValues?: Record<keyof FormValues, any>
  ) => {
    // Go thru each field in submittedFormValues
    return Object.entries(submittedFormValues).reduce(
      (mutationFieldsAccum, [formKey, formValue]: [string & keyof FormValues, any]) => {
        // Check for custom onSubmit field handler
        const onSubmitFieldMutationProcessor =
          this.customFieldHandlers.onSubmit?.[formKey] ??
          FormFieldHandlers.defaultOnSubmitFieldMutationProcessor;

        const { wasChanged, value } = onSubmitFieldMutationProcessor(
          formValue,
          existingItemInitialValues?.[formKey] ?? null
        );

        if (wasChanged) mutationFieldsAccum[formKey] = value;

        return mutationFieldsAccum;
      },
      {} as ValuesForMutation
    );
  };
}

export type FormFieldHandlersSchema = {
  onUpdate?: OnUpdateFieldHandlers;
  onSubmit?: OnSubmitFieldMutationProcessors;
};

type FormFieldName = string;
// onUpdate types:
type OnUpdateCallableFieldHandlers = Record<FormFieldName, GetInitFieldValueOnUpdateFn>;
type OnUpdateFieldHandlers = Record<FormFieldName, false | GetInitFieldValueOnUpdateFn>; // false indicates immutable
type GetInitFieldValueOnUpdateFn = (rawFieldValue?: any) => any;
// onSubmit types:
type OnSubmitFieldMutationProcessors = Record<FormFieldName, OnSubmitFieldMutationProcessorFn>;

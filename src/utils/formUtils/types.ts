export type OnSubmitFieldMutationProcessorFn<FormFieldValueType extends any = any> = (
  formSubmitHandlerFieldValue: FormFieldValueType | null,
  initialFieldValue: FormFieldValueType | null,
  ...args: any[]
) => OnSubmitFieldMutationProcessorFnReturn;

export interface OnSubmitFieldMutationProcessorFnReturn<FormFieldValueType extends any = any> {
  wasChanged: boolean;
  mutationType?: "UPDATE" | "DELETE";
  value?: FormFieldValueType | null;
}

import type { ChecklistInputFormProps } from "../types";

/**
 * Form-related props for `ChecklistItemInput` and related components.
 */
export type ChecklistItemInputFormProps = ChecklistInputFormProps & {
  /**
   * The index of a given {@link BaseChecklistItemType|checklist-item} within an array of
   * checklist-item objects. This is used by `ChecklistItemInput` and related components to
   * ascertain the Formik field ID to provide to [Formik's `useField`][useField-ref] hook for
   * the input's associated field.
   *
   * For example, if the {@link ChecklistInputFormProps.checklistFieldID|`checklistFieldID`} is
   * `"checklist"`, and the `checklistItemIndex` is `0`, then the Formik field IDs are determined
   * to be as follows:
   *
   * - `"description"` field ID: `'checklist[0]["description"]'`
   * - `"isCompleted"` field ID: `'checklist[0]["isCompleted"]'`
   *
   * [useField-ref]: https://formik.org/docs/api/useField#reference
   */
  checklistItemIndex: number;
};

/**
 * Form-related props for `ChecklistInput` and related components.
 */
export type ChecklistInputFormProps = {
  /**
   * The checklist's Formik field ID to provide to [Formik's `useField`][useField-ref]
   * hook. Components which read/write individual checklist-item values like `description`
   * and `isCompleted` will also use this value to determine their respective field IDs.
   * See `ChecklistItemInputFormProps` for details.
   *
   * [useField-ref]: https://formik.org/docs/api/useField#reference
   */
  checklistFieldID: string;
};

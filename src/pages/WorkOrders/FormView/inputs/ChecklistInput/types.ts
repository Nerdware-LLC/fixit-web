import type { FieldHelperProps } from "formik";
import type { WorkOrderFormChecklistItem } from "../../formFieldHandlers";

export type { WorkOrderFormChecklistItem };

export type ChecklistFieldProps = {
  checklistFieldValue: Array<WorkOrderFormChecklistItem>;
  setValue: FieldHelperProps<any>["setValue"];
};

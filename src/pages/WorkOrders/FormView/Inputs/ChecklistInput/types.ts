import type { FieldHelperProps } from "formik";
import type { WorkOrderFormChecklistItem as _WorkOrderFormChecklistItem } from "../../formFieldHandlers";

// TODO rm this wrapper around the base type once base type is updated to use symbol getter "localIndex"
export type WorkOrderFormChecklistItem = _WorkOrderFormChecklistItem & { localIndex: number };

export type ChecklistFieldProps = {
  checklistFieldValue: Array<WorkOrderFormChecklistItem>;
  setValue: FieldHelperProps<any>["setValue"];
};

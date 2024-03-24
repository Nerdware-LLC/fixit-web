import { object as yupObject, array, bool } from "yup";
import { yupCommonSchema } from "@/components/Form/helpers";

/**
 * A Yup Schema for checklist-item objects used by `ChecklistInput` components.
 */
export const yupBaseChecklistItemSchema = yupObject({
  id: yupCommonSchema.stringNullable,
  description: yupCommonSchema.string.required("Please provide a description"),
  isCompleted: bool().default(false),
});

/**
 * A Yup Schema for arrays of checklist-item objects used by `ChecklistInput` components.
 */
export const yupBaseChecklistSchema = array(yupBaseChecklistItemSchema).compact();

/**
 * A Yup Schema for a nullable `"checklist"` field in the shape `ChecklistInput` expects.
 */
export const yupChecklistFieldSchema = yupObject({
  checklist: yupBaseChecklistSchema.nullable().default(null),
});

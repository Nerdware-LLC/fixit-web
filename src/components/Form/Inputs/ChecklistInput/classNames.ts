import { checklistClassNames } from "@/components/Checklist/classNames";
import { checklistItemInputClassNames } from "./ChecklistItemInput/classNames";

/**
 * Class names for `ChecklistInput` components (src/components/Form/Inputs/ChecklistInput/).
 *
 * This object includes {@link checklistItemInputClassNames} exported from the `ChecklistItemInput`
 * sub-component under the key `itemInput`, as well as {@link checklistClassNames} exported from
 * the internal `Checklist` component.
 */
export const checklistInputClassNames = {
  ...checklistClassNames,
  removeChecklistButton: "checklist-input__remove-checklist-button",
  itemInput: {
    ...checklistItemInputClassNames,
  },
} as const;

import { FormFieldHandlers, type FormValues } from "@utils/formUtils";
import type { WorkOrder, FixitUser, ChecklistItem } from "@graphql/types";

export const woFormFieldHandlers = new FormFieldHandlers<WorkOrderFormValues>({
  onUpdate: {
    createdBy: false,
    assignedTo: (rawFieldValue?: FixitUser) => rawFieldValue?.id ?? null,
    status: false,
    checklist: (rawFieldValue?: WorkOrder["checklist"]) => {
      const filteredChecklist =
        (rawFieldValue?.filter((checklistItem) => !!checklistItem) as ChecklistItem[] | null) ??
        null;

      return (
        filteredChecklist?.map(({ id, description, isCompleted }) => ({
          id,
          description,
          isCompleted,
        })) ?? null
      );
    },
    entryContactPhone: (rawFieldValue) => rawFieldValue?.replace(/\D+/g, "") ?? null,
    contractorNotes: false,
  },
  onSubmit: {
    checklist: (formValue, existingValue) => {
      // First, remove any checklistItems with a falsey description
      const checklistItemsWithDescriptions = Array.isArray(formValue)
        ? formValue.filter((checklistItem) => !!checklistItem?.description)
        : null;

      const cleanedChecklist =
        checklistItemsWithDescriptions && checklistItemsWithDescriptions.length >= 1
          ? checklistItemsWithDescriptions
          : null;

      return FormFieldHandlers.wasArrayChanged(cleanedChecklist, existingValue);
    },
    dueDate: (formValue, existingValue) => {
      return FormFieldHandlers.wasDateTimeChanged(formValue, existingValue);
    },
    scheduledDateTime: (formValue, existingValue) => {
      return FormFieldHandlers.wasDateTimeChanged(formValue, existingValue, "minute");
    },
  },
});

export type WorkOrderFormValues = FormValues<
  WorkOrder,
  "id" | "createdBy" | "status" | "contractorNotes" | "createdAt" | "updatedAt"
>;

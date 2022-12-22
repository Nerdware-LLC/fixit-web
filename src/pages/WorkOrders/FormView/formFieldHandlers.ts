import { FormFieldHandlers } from "@utils";
import type { WorkOrderChecklist } from "@types";

export const woFormFieldHandlers = new FormFieldHandlers({
  onUpdate: {
    createdBy: false,
    assignedTo: (rawFieldValue) => rawFieldValue?.id,
    status: false,
    checklist: (rawFieldValue?: WorkOrderChecklist) => {
      return (
        rawFieldValue?.map(({ id, description, isCompleted }, index) => ({
          id,
          description,
          isCompleted,
          [Symbol("localIndex")]: index
        })) ?? null
      );
    },
    entryContactPhone: (rawFieldValue) => rawFieldValue?.replace(/\D+/g, "") ?? null,
    contractorNotes: false
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
    }
  }
});

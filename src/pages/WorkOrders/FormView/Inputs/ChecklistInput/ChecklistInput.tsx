import { useField } from "formik";
import { CreateChecklistButton } from "./CreateChecklistButton";
import { Checklist } from "./Checklist";

export const ChecklistInput = () => {
  const [checklistField] = useField("checklist");

  // If checklist field value is null, show 'create checklist' btn, else show checklist comp

  return !Array.isArray(checklistField.value) ? <CreateChecklistButton /> : <Checklist />;
};

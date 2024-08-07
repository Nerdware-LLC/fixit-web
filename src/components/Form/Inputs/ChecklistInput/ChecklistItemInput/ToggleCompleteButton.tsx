import { getTypeSafeError } from "@nerdware/ts-type-safety-utils";
import { useField } from "formik";
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EmptyCheckBoxIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import type { BaseChecklistItemType } from "@/components/Checklist/types.js";
import type { ChecklistItemInputFormProps } from "./types.js";

export const ToggleCompleteButton = ({
  fieldID,
  checklistItemIndex,
}: ChecklistItemInputFormProps) => {
  // Ascertain the "isCompleted" Formik field ID for the checklist item:
  const checklistItemIsCompletedFormikFieldID = `${fieldID}[${checklistItemIndex}]["isCompleted"]`;

  const [{ value: isCompleted }, _, { setValue, setTouched, setError }] = useField<
    BaseChecklistItemType["isCompleted"]
  >(checklistItemIsCompletedFormikFieldID);

  const toggleIsCompleted: IconButtonProps["onClick"] = async () => {
    try {
      await setTouched(true);
      await setValue(!isCompleted);
    } catch (error) {
      setError(getTypeSafeError(error).message);
    }
  };

  return (
    <InputAdornment position="start">
      <Tooltip title={!isCompleted ? "Mark item as completed" : "Mark item as incomplete"}>
        <IconButton onClick={toggleIsCompleted} edge="start" aria-label="toggle complete">
          {!isCompleted ? <EmptyCheckBoxIcon /> : <CheckBoxIcon color="success" />}
        </IconButton>
      </Tooltip>
    </InputAdornment>
  );
};

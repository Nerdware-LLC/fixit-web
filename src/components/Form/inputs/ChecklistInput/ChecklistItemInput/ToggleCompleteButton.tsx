import { useField } from "formik";
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EmptyCheckBoxIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { getTypeSafeError } from "@/utils/typeSafety/getTypeSafeError";
import type { BaseChecklistItemType } from "@/components/Checklist/types";
import type { ChecklistItemInputFormProps } from "./types";

export const ToggleCompleteButton = ({
  checklistFieldID,
  checklistItemIndex,
}: ChecklistItemInputFormProps) => {
  // Ascertain the "isCompleted" Formik field ID for the checklist item:
  const checklistItemIsCompletedFormikFieldID = `${checklistFieldID}[${checklistItemIndex}]["isCompleted"]`;

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
      <Tooltip
        title={!isCompleted ? "Mark item as completed" : "Mark item as incomplete"}
        PopperProps={{
          sx: {
            [`& > .${tooltipClasses.tooltip}`]: {
              backgroundColor: "rgb(97,97,97)", // rm the usual 0.92 alpha from tooltip bg
            },
          },
        }}
      >
        <IconButton onClick={toggleIsCompleted} edge="start" aria-label="toggle complete">
          {!isCompleted ? <EmptyCheckBoxIcon /> : <CheckBoxIcon color="success" />}
        </IconButton>
      </Tooltip>
    </InputAdornment>
  );
};

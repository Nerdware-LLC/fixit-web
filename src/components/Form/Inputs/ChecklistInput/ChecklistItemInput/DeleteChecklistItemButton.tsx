import { getTypeSafeError } from "@nerdware/ts-type-safety-utils";
import { useField } from "formik";
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import XDeleteIcon from "@mui/icons-material/HighlightOff";
import type { BaseChecklistType } from "@/components/Checklist/types.js";
import type { ChecklistItemInputFormProps } from "./types.js";

export const DeleteChecklistItemButton = ({
  checklistFieldID = "checklist",
  checklistItemIndex,
}: ChecklistItemInputFormProps) => {
  // This btn uses the root checklist Formik field ID to access the entire checklist array:
  const [{ value: checklist }, _, { setValue, setError }] = useField<BaseChecklistType | null>(
    checklistFieldID
  );

  const deleteChecklistItem: IconButtonProps["onClick"] = async (event) => {
    try {
      if (Array.isArray(checklist)) {
        checklist.splice(Number(event.currentTarget.dataset.itemIndex), 1);
        await setValue(checklist.length !== 0 ? checklist : null);
      }
    } catch (error) {
      setError(getTypeSafeError(error).message);
    }
  };

  return (
    <InputAdornment position="end">
      <Tooltip title="Delete item">
        <IconButton
          onClick={deleteChecklistItem}
          data-item-index={checklistItemIndex}
          edge="end"
          aria-label="delete"
        >
          <XDeleteIcon opacity={0.6} fontSize="small" />
        </IconButton>
      </Tooltip>
    </InputAdornment>
  );
};

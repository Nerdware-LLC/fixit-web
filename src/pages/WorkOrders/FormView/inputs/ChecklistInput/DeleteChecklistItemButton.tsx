import { useField } from "formik";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import XDeleteIcon from "@mui/icons-material/HighlightOff";

export const DeleteChecklistItemButton = ({
  checklistItemIndex,
}: DeleteChecklistItemButtonProps) => {
  const [{ value: checklistFieldValue }, , { setValue }] = useField("checklist");

  const deleteChecklistItem: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    checklistFieldValue.splice(Number(event.currentTarget.dataset.itemIndex), 1);
    setValue(checklistFieldValue.length !== 0 ? checklistFieldValue : null);
  };

  return (
    <InputAdornment position="end">
      <Tooltip
        title="Delete item"
        arrow
        PopperProps={{
          sx: {
            [`& > .${tooltipClasses.tooltip}`]: {
              backgroundColor: "rgb(97,97,97)", // rm's the usual 0.92 alpha from tooltip bg
            },
          },
        }}
      >
        <IconButton
          onClick={deleteChecklistItem}
          data-item-index={checklistItemIndex}
          edge="end"
          aria-label="delete"
        >
          <XDeleteIcon />
        </IconButton>
      </Tooltip>
    </InputAdornment>
  );
};

export type DeleteChecklistItemButtonProps = {
  checklistItemIndex: number;
};

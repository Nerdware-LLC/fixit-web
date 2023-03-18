import { useField } from "formik";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";

export const DeleteChecklistItemButton = ({
  checklistItemIndex
}: {
  checklistItemIndex: number;
}) => {
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
            "& > .MuiTooltip-tooltip": {
              backgroundColor: "rgb(97,97,97)", // rm's the usual 0.92 alpha from tooltip bg
              paddingBottom: "1px" // better spacing and text alignment
            }
          }
        }}
      >
        <IconButton
          onClick={deleteChecklistItem}
          data-item-index={checklistItemIndex}
          edge="end"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </InputAdornment>
  );
};

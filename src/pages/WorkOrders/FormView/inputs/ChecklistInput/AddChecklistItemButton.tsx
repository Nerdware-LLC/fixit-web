import { useField } from "formik";
import Button, { buttonClasses } from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import PlusIcon from "@mui/icons-material/Add";

export const AddChecklistItemButton = () => {
  const [{ value: checklistFieldValue }, meta, { setValue }] = useField("checklist");

  const addChecklistItem = () => {
    checklistFieldValue.push({ id: null, description: null, isCompleted: false });
    setValue(checklistFieldValue, false);
  };

  const ButtonComp = (
    <Button
      onClick={addChecklistItem}
      disabled={!!meta.error}
      startIcon={<PlusIcon />}
      size="small"
      variant="outlined"
      aria-label="add checklist item"
      sx={{
        [`& > .${buttonClasses.startIcon}`]: {
          margin: "0 0.35rem 0.135rem 0",
        },
      }}
    >
      Add Item
    </Button>
  );

  // Can't put disabled button in Tooltip (causes error), hence this ternary
  return meta.error ? (
    ButtonComp
  ) : (
    <Tooltip title="Add checklist item" arrow>
      {ButtonComp}
    </Tooltip>
  );
};

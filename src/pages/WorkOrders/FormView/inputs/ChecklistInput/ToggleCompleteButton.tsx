import { useField } from "formik";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EmptyCheckBoxIcon from "@mui/icons-material/CheckBoxOutlineBlank";

export const ToggleCompleteButton = ({
  checklistItemIndex,
  formikFieldID = `checklist[${checklistItemIndex}]["isCompleted"]`,
}: ToggleCompleteButtonProps) => {
  const [{ value: isCompleted }, , { setValue, setTouched }] = useField(formikFieldID);

  const toggleIsCompleted: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setTouched(true);
    setValue(!isCompleted);
  };

  return (
    <InputAdornment position="start">
      <Tooltip
        title={!isCompleted ? "Mark item as completed" : "Mark item as incomplete"}
        arrow
        PopperProps={{
          sx: {
            [`& > .${tooltipClasses.tooltip}`]: {
              backgroundColor: "rgb(97,97,97)", // rm the usual 0.92 alpha from tooltip bg
            },
          },
        }}
      >
        <IconButton
          onClick={toggleIsCompleted}
          data-item-index={checklistItemIndex}
          edge="start"
          aria-label="toggle complete"
        >
          {!isCompleted ? <EmptyCheckBoxIcon /> : <CheckBoxIcon color="success" />}
        </IconButton>
      </Tooltip>
    </InputAdornment>
  );
};

export type ToggleCompleteButtonProps = {
  checklistItemIndex: number;
  formikFieldID?: string;
};

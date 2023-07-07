import { useField, useFormikContext } from "formik";
import { styled } from "@mui/material/styles";
import { formControlClasses } from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { DeleteChecklistItemButton } from "./DeleteChecklistItemButton";
import { ToggleCompleteButton } from "./ToggleCompleteButton";

export const ChecklistItemInput = ({
  checklistItemIndex,
  formikFieldID = `checklist[${checklistItemIndex}]["description"]`,
  autoFocus,
  enableDelete,
}: ChecklistItemInputProps) => {
  const [{ value: descriptionValue }, meta, { setValue, setTouched }] = useField(formikFieldID);
  const { validateField } = useFormikContext();

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    setValue(event.target.value);
  };

  const handleBlur = () => {
    setTouched(true);
    validateField(`${formikFieldID}`);
  };

  return (
    <StyledLI>
      <TextField
        label={meta.error ?? null}
        placeholder="Description"
        value={descriptionValue ?? ""}
        onChange={handleTextChange}
        onBlur={handleBlur}
        error={meta.touched && !!meta.error}
        autoFocus={autoFocus}
        size="small"
        fullWidth
        InputProps={{
          startAdornment: <ToggleCompleteButton checklistItemIndex={checklistItemIndex} />,
          ...(enableDelete && {
            endAdornment: <DeleteChecklistItemButton checklistItemIndex={checklistItemIndex} />,
          }),
        }}
      />
    </StyledLI>
  );
};

const StyledLI = styled("li")(({ theme: { palette } }) => ({
  width: "100%",
  margin: "0 0 3px 0",
  padding: "3px 0",

  [`& > .${formControlClasses.root}`]: {
    backgroundColor: palette.mode === "dark" ? "#272727" : "#ededed",
  },
}));

export type ChecklistItemInputProps = {
  checklistItemIndex: number;
  formikFieldID?: string;
  autoFocus: boolean;
  enableDelete: boolean;
};

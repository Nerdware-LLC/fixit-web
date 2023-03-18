import { useField, useFormikContext } from "formik";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { DeleteChecklistItemButton } from "./DeleteChecklistItemButton";

export const ChecklistItemInput = ({
  checklistItemIndex,
  formikFieldID = `checklist[${checklistItemIndex}]["description"]`,
  autoFocus,
  enableDelete
}: {
  checklistItemIndex: number;
  formikFieldID?: string;
  autoFocus: boolean;
  enableDelete: boolean;
}) => {
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
    <StyledListItem>
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
        {...(enableDelete && {
          InputProps: {
            endAdornment: <DeleteChecklistItemButton checklistItemIndex={checklistItemIndex} />
          }
        })}
      />
    </StyledListItem>
  );
};

const StyledListItem = styled("div")(({ theme: { palette } }) => ({
  width: "100%",
  margin: "0 0 3px 0",
  padding: "3px 0",

  "& > .MuiFormControl-root": {
    backgroundColor: palette.mode === "dark" ? "#272727" : "#ededed"
  }
}));

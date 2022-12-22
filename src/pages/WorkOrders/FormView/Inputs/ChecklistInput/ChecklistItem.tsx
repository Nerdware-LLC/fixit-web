import { useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useField } from "formik";

export const ChecklistItem = ({
  formikFieldID,
  autoFocus,
  enableDelete,
  handleClickDelete
}: {
  formikFieldID: string;
  autoFocus: boolean;
  enableDelete: boolean;
  handleClickDelete: () => void;
}) => {
  const [field, meta, { setValue, setTouched }] = useField(formikFieldID);
  const [localError, setLocalError] = useState(false);

  const hasError = !!localError || !!meta.error;

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;

    if (text.length > 0) setLocalError(false);
    const newFieldValue = { ...field.value, description: text };
    setValue(newFieldValue);
  };

  const handleFieldBlur = () => {
    setTouched(true);
    if (!field.value.description) setLocalError(true);
  };

  return (
    <StyledListItem>
      <TextField
        label={hasError ? "Description required" : null}
        placeholder={hasError ? "" : "Description"}
        value={field.value.description ?? ""}
        onChange={handleTextChange}
        onBlur={handleFieldBlur}
        error={meta.touched && hasError}
        autoFocus={autoFocus}
        size="small"
        style={{ width: "100%" }}
        {...(enableDelete && {
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickDelete} edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </InputAdornment>
            )
          }
        })}
      />
    </StyledListItem>
  );
};

const StyledListItem = styled("div")({
  width: "100%",
  margin: "0 0 3px 0",
  padding: "3px 0"
});

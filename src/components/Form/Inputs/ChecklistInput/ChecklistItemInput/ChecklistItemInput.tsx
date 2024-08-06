import { getTypeSafeError } from "@nerdware/ts-type-safety-utils";
import { useField, useFormikContext } from "formik";
import { styled } from "@mui/material/styles";
import { formControlClasses } from "@mui/material/FormControl";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import { DeleteChecklistItemButton } from "./DeleteChecklistItemButton.jsx";
import { ToggleCompleteButton } from "./ToggleCompleteButton.jsx";
import { checklistItemInputClassNames } from "./classNames.js";
import type { BaseChecklistItemType } from "@/components/Checklist/types.js";
import type { Simplify } from "type-fest";
import type { ChecklistItemInputFormProps } from "./types.js";

export type CheckListItemInputProps = Simplify<
  ChecklistItemInputFormProps & {
    autoFocus: Required<TextFieldProps["autoFocus"]>;
    enableDelete: boolean;
  }
>;

/**
 * An input component built with Formik and Mui TextField for gathering a single
 * checklist item's `description` and `isCompleted` values.
 *
 * > For use in `renderChecklistItem` prop of `Checklist` components.
 */
export const ChecklistItemInput = ({
  fieldID = "checklist",
  checklistItemIndex,
  autoFocus,
  enableDelete,
  ...listItemProps
}: CheckListItemInputProps) => {
  // Ascertain the "description" Formik field ID for the checklist item:
  const descriptionFormikFieldID = `${fieldID}[${checklistItemIndex}]["description"]`;

  const [{ value: descriptionValue }, meta, { setValue, setTouched, setError }] =
    useField<BaseChecklistItemType["description"]>(descriptionFormikFieldID);

  const { validateField } = useFormikContext();

  // Fn which calls the provided fn-arg, and if it fails, sets the error message:
  const tryFieldFunction = async (fieldFunction: () => unknown) => {
    try {
      const result = await fieldFunction();
      return result;
    } catch (error) {
      setError(getTypeSafeError(error).message);
    }
  };

  /**
   * Why use onKeyDown to set meta.touched=true? Bc the field uses autoFocus, so setting
   * touched=true onFocus causes every new ChecklistItemInput's TextField to be error'd on
   * first render. Waiting until the user has typed something achieves the desired behavior.
   */
  const handleKeyDown: TextFieldProps["onKeyDown"] = async () => {
    if (!meta.touched) await tryFieldFunction(() => setTouched(true));
  };

  const handleTextChange: TextFieldProps["onChange"] = async (event) => {
    await tryFieldFunction(() => setValue(event.target.value));
  };

  const handleBlur: TextFieldProps["onBlur"] = async () => {
    await tryFieldFunction(() => validateField(descriptionFormikFieldID));
  };

  return (
    <StyledLI className={checklistItemInputClassNames.root} {...listItemProps}>
      <TextField
        label={meta.error ?? null}
        placeholder="Description"
        value={descriptionValue}
        onKeyDown={handleKeyDown}
        onChange={handleTextChange}
        onBlur={handleBlur}
        error={meta.touched && !!meta.error}
        autoFocus={autoFocus}
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <ToggleCompleteButton fieldID={fieldID} checklistItemIndex={checklistItemIndex} />
          ),
          ...(enableDelete && {
            endAdornment: (
              <DeleteChecklistItemButton
                fieldID={fieldID}
                checklistItemIndex={checklistItemIndex}
              />
            ),
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
  listStyle: "none",

  [`& > .${formControlClasses.root}`]: {
    backgroundColor: palette.mode === "dark" ? "#272727" : "#ededed",

    [`& fieldset.${outlinedInputClasses.notchedOutline} legend`]: {
      height: "11px",
      /* For some reason, the <legend> loses its height when there's no error.
      This is a problem, bc with the Mui OutlinedInput, the <legend> is what
      creates the outline, and with no <legend> height, the outline "shrinks",
      causing the input to appear vertically off-center and way too small.
      Forcing the <legend> to retain the height it has when there's an error
      (11px) fixes this issue. */
    },
  },
}));

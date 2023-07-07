import { grid as muiGridSxProps, type GridProps as MuiGridSxProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import { formHelperTextClasses } from "@mui/material/FormHelperText";
import { formLabelClasses } from "@mui/material/FormLabel";
import MuiTextField, { type TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";

/**
 * Mui DatePicker with Mui-system grid props like `gridArea`.
 *
 * Usage example:
 * ```
 * <StyledTextField gridArea="top-left" {...otherProps} />
 * ```
 */
export const StyledTextField = styled(MuiTextField, {
  shouldForwardProp: (propName: string) => !propName.startsWith("grid"),
})<StyledTextFieldProps>({
  [`& .${formLabelClasses.root}`]: {
    textTransform: "capitalize",
  },
  [`& .${formHelperTextClasses.root}`]: {
    whiteSpace: "nowrap",
  },
  ...muiGridSxProps,
});

export type StyledTextFieldProps = MuiTextFieldProps & MuiGridSxProps;

import { grid as muiGridSxProps, type GridProps as MuiGridSxProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import { formHelperTextClasses } from "@mui/material/FormHelperText";
import { formLabelClasses } from "@mui/material/FormLabel";
import MuiTextField, {
  type TextFieldProps as MuiTextFieldProps,
  type TextFieldVariants as MuiTextFieldVariants,
} from "@mui/material/TextField";

export type BaseTextFieldProps<Variant extends MuiTextFieldVariants = MuiTextFieldVariants> =
  MuiTextFieldProps<Variant> & MuiGridSxProps;

/**
 * This component serves as the base `TextField` component for the app.
 *
 * It does not contain any implementation logic - it is simply a Mui TextField
 * with minor custom styling and Mui-system grid props like `gridArea`.
 *
 * @example
 * ```
 * <BaseTextField gridArea="top-left" {...otherProps} />
 * ```
 */
export const BaseTextField = styled(MuiTextField, {
  shouldForwardProp: (propName: string) => !propName.startsWith("grid"),
})<BaseTextFieldProps>({
  [`& .${formLabelClasses.root}`]: {
    textTransform: "capitalize",
  },
  [`& .${formHelperTextClasses.root}`]: {
    whiteSpace: "nowrap",
  },
  ...muiGridSxProps,
});

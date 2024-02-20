import { styled } from "@mui/material/styles";
import { formHelperTextClasses } from "@mui/material/FormHelperText";
import { formLabelClasses } from "@mui/material/FormLabel";
import { inputAdornmentClasses } from "@mui/material/InputAdornment";
import { inputBaseClasses } from "@mui/material/InputBase";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { typographyClasses } from "@mui/material/Typography";
import { CurrencyInput } from "@/components/Form/inputs/CurrencyInput";

export const InvoiceAmountInput = styled(CurrencyInput)(({ gridArea }) => ({
  gridArea: gridArea as string,
  height: "9.5rem",

  /* When variant="outlined", Mui uses a separate FormLabel component for
  the input legend, and the actual <legend> element just creates spacing in
  the fieldset border. Setting the font-size here is necessary to ensure the
  spacing behind FormLabel is the correct size (font is too large by default,
  which results in too large of a gap in the fieldset border).  */
  "& legend": {
    fontSize: "1.18rem",
  },
  [`& .${formLabelClasses.root}`]: {
    textTransform: "capitalize",
    [`&.${inputLabelClasses.outlined}`]: {
      top: "-3px",
    },
  },

  [`& .${inputBaseClasses.root}`]: {
    height: "8rem",
    fontSize: "3rem",
    paddingTop: "1rem",
  },

  [`& .${inputAdornmentClasses.positionStart} .${typographyClasses.root}`]: {
    fontSize: "3.5rem",
  },

  [`& .${inputLabelClasses.root}`]: {
    fontSize: "1.5rem",
  },

  [`& .${formHelperTextClasses.root}`]: {
    whiteSpace: "nowrap",
    alignSelf: "center",
  },
}));

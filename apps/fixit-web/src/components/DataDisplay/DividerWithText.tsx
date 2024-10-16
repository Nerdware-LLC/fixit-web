import { styled } from "@mui/material/styles";
import Divider, { dividerClasses, type DividerProps } from "@mui/material/Divider";

/**
 * A Mui Divider styled to center text content (works best if `children` is a string).
 */
export const DividerWithText = styled(Divider)({
  margin: "0.5rem",
  [`& > .${dividerClasses.wrapper}`]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "4ch",
  },
});

export type DividerWithTextProps = DividerProps;

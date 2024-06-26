import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import { containerClassNames } from "./classNames.js";
import type { Simplify } from "type-fest";

/**
 * A div which allows horizontal scrolling, with preferred styles.
 *
 * This is a great generic container for mobile views.
 */
export const XscrollContainer = ({
  tabIndex = 0,
  className = "",
  children,
  ...boxProps
}: XscrollContainerProps) => (
  <StyledBox
    tabIndex={tabIndex}
    className={containerClassNames.xScrollContainerRoot + " " + className}
    {...boxProps}
  >
    {children}
  </StyledBox>
);

export const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "horizontalPadding",
})<XscrollContainerProps>(({ horizontalPadding = "1rem" }) => ({
  width: "auto",
  maxWidth: "100%",
  overflowX: "auto",
  display: "flex",
  flexDirection: "row",

  "&::before, &::after": {
    content: '" "',
    display: "inline-block",
    width: horizontalPadding,
    minWidth: horizontalPadding,
  },

  "& > div": {
    flexGrow: 1,
  },
}));

export type XscrollContainerProps = Simplify<{ horizontalPadding?: string } & BoxProps>;

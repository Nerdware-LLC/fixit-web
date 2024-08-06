import React from "react";
import { styled } from "@mui/material/styles";
import { containerClassNames } from "./classNames.js";

export type XscrollContainerProps = React.ComponentProps<typeof StyledDiv>;

/**
 * A div which allows horizontal scrolling, with preferred styles.
 *
 * This is a great generic container for mobile views.
 */
export const XscrollContainer = ({
  tabIndex = 0,
  className = "",
  style = {},
  children,
  ...props
}: XscrollContainerProps) => (
  <StyledDiv
    tabIndex={tabIndex}
    className={`${containerClassNames.xScrollContainerRoot} ${className}`}
    style={{ ...style, overflowX: "auto" }}
    {...props}
  >
    {children}
  </StyledDiv>
);

const StyledDiv = styled("div")({
  width: "auto",
  maxWidth: "100%",
  overflowX: "auto",
  display: "flex",
  flexDirection: "row",

  "&::before, &::after": {
    content: '""',
    display: "inline-block",
    width: "1rem",
    minWidth: "1rem",
  },

  "& > div": {
    flexGrow: 1,
    overflow: "visible",
  },
});

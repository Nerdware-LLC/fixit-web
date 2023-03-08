import { styled } from "@mui/material/styles";
import React from "react";

/**
 * A div which allows horizontal scrolling, with preferred styles.
 * - Great generic container for mobile views.
 */
export const XscrollContainer = ({
  children,
  ...props
}: React.ComponentProps<typeof StyledXscrollContainer>) => (
  <StyledXscrollContainer className="x-scroll-container" {...props}>
    {children}
  </StyledXscrollContainer>
);

export const StyledXscrollContainer = styled("div")({
  width: "auto",
  maxWidth: "100%",
  overflowX: "auto",
  display: "flex",
  flexDirection: "row",

  "&::before, &::after": {
    content: '" "',
    display: "inline-block",
    minWidth: "1rem"
  },

  "& > div": {
    width: "auto"
  }
});
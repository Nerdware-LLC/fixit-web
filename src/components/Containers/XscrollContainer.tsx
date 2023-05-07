import { styled } from "@mui/material/styles";

/**
 * A div which allows horizontal scrolling, with preferred styles.
 * - Great generic container for mobile views.
 */
export const XscrollContainer = ({ children, ...props }: XscrollContainerProps) => (
  <StyledDiv className={xScrollContainerClassNames.root} {...props}>
    {children}
  </StyledDiv>
);

export const xScrollContainerClassNames = {
  root: "x-scroll-container",
};

export const StyledDiv = styled("div")({
  width: "auto",
  maxWidth: "100%",
  overflowX: "auto",
  display: "flex",
  flexDirection: "row",

  "&::before, &::after": {
    content: '" "',
    display: "inline-block",
    width: "1rem",
    minWidth: "1rem",
  },

  "& > div": {
    flexGrow: 1,
  },
});

export type XscrollContainerProps = React.ComponentProps<typeof StyledDiv>;
